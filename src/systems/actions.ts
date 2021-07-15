import { Action } from '../state/components'
import world from '../state/ecs'

const entitiesWithAnAction = world.createQuery({
  all: [Action]
})

export function calculateMoves(): void {
  for (const entity of entitiesWithAnAction.get()) {
    const actions = entity['action'] as Action[]
    actions[0].perform()
  }
}