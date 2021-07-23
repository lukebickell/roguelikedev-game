import { Action, MoveSet } from '../state'
import world from '../state/ecs'

const entitiesWithMoves = world.createQuery({
  all: [ MoveSet ]
})

export function getAndPerformActions(): void {
  const entities = [...entitiesWithMoves.get()]
  for (const entity of entities) {
    const moveSet = entity['moveSet'] as MoveSet

    // Get best move from entity's moveset
    const action = moveSet.getAction()
    // Add & perform the action
    entity.add(Action, { action })
  }
}