import { Entity } from "geotic"
import { Action, Position, _Action } from ".."
import { GridDimensions } from "../../constants"
import { EntityCaches } from "../cache"
import world from "../ecs"
import { Attack } from "./attack"

export class Move extends _Action {
  private x: number
  private y: number

  constructor(x: number, y: number) {
    super()
    this.x = x
    this.y = y
  }

  perform(entity: Entity): void {
    const position = entity['position'] as Position
    let moveIsLegal = true

    let mx = position.x + this.x
    let my = position.y + this.y

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
      // Add an Attack action, then execute it
      entity.add(Action, { action: new Attack(blocker)})
      const currentActions = entity['action'] as Action[]
      currentActions[currentActions.length - 1].perform()
    }

    if (moveIsLegal) {
      position.setCoordinates(mx, my)
    }
  }
}
