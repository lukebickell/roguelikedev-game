import { Entity } from "geotic"
import { _Action, Action } from "."
import { Position } from ".."
import { GridDimensions } from "../../constants"
import { EntityCaches } from "../cache"
import world from "../ecs"
import { Attack } from "./attack"

export class Walk extends _Action {
  private x: number
  private y: number
  private relative: boolean

  constructor(x: number, y: number, relative = true) {
    super()
    this.x = x
    this.y = y
    this.relative = relative
  }

  perform(entity: Entity): void {
    const position = entity['position'] as Position
    let moveIsLegal = true

    let mx = position.x + this.x
    let my = position.y + this.y

    if (!this.relative) {
      mx = this.x
      my = this.y
    }

    // Legality checks
    // Grid borders
    mx = Math.min(GridDimensions.width - 1, mx)
    my = Math.min(GridDimensions.height - 1, my)

    // Blocking entities
    const overlappingEntities = EntityCaches.getEntitiesAtLocation(mx, my)
    let blockers: Entity[] = []
    for (const entityId of overlappingEntities) {
      const entity = world.getEntity(entityId)
      if (entity['isBlocking']) {
        blockers.push(entity)
        moveIsLegal = false
      }
    }

    // Contextual action against blockers
    for (const blocker of blockers) {
      // Perform an Attack action
      entity.add(Action, { action: new Attack(blocker)})
    }

    if (moveIsLegal) {
      position.setCoordinates(mx, my)
    }
  }
}
