import { Entity } from 'geotic'
import { EntityCaches } from '../state/cache'
import { Description, Move, Position } from '../state/components'
import world from '../state/ecs'

const movableEntities = world.createQuery({
  all: [Move]
})

export function calculateMoves(grid: { width: number, height: number }): void {
  for (const entity of movableEntities.get()) {
    const position = entity['position'] as Position
    const move = entity['move'] as Move
    let moveIsLegal = true

    let mx = position.x + move.x
    let my = position.y + move.y

    // Legality checks
    // Grid borders
    mx = Math.min(grid.width - 1, mx)
    my = Math.min(grid.height - 1, my)

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

    for (const blocker of blockers) {
      const attacker = (entity?.['description'] as Description)?.name || 'something unknown'
      const target = (blocker?.['description'] as Description)?.name
      console.log(`${ attacker } kicked a ${ target }`)
    }

    if (moveIsLegal) {
      position.setCoordinates(mx, my)
    }
    entity.remove(move)
  }
}