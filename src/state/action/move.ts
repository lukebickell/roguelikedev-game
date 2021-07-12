import { Entity } from "geotic"
import { GridDimensions } from "../../constants"
import { EntityCaches } from "../cache"
import { _Action, Position, Description } from "../components"
import world from "../ecs"

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
      const attacker = (entity?.['description'] as Description)?.name || 'something unknown'
      const target = (blocker?.['description'] as Description)?.name
      console.log(`${ attacker } kicked a ${ target }`)
    }

    if (moveIsLegal) {
      position.setCoordinates(mx, my)
    }
  }
}
