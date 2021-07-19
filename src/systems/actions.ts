import { Entity } from 'geotic'
import { moveToTarget } from '../lib/pathfinding'
import { Action, Ai, Description, IsInFov } from '../state/components'
import world from '../state/ecs'

const entitiesWithAi = world.createQuery({
  all: [Ai, Description]
})

export function performActions(player: Entity): void {
  player['action'][0].perform()
  const entities = [...entitiesWithAi.get()]
  for (const entity of entities) {
    // Get an action based on AI
    if (entity.has(IsInFov)) {
      moveToTarget(entity, player)
    }

    const actions = entity['action'] as Action[]
    if (actions) {
      actions[0].perform()
    }
  }
}