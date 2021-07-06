import { Move, Position } from '../state/component'
import engine from '../state/ecs'

const movableEntities = engine.createQuery({
  all: [Move]
})

export function calculateMoves() {
  for (const entity of movableEntities.get()) {
    const position = entity['position'] as Position
    const move = entity['move'] as Move

    const mx = position.x + move.x
    const my = position.y + move.y

    // legality checks

    position.prevX = position.x
    position.prevY = position.y
    position.x = mx
    position.y = my

    entity.remove(move)
  }
}