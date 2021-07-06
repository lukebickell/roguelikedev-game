import world from '../state/ecs'
import { Appearance, Position } from '../state/component'

export const renderableEntities = world.createQuery({
  all: [Position, Appearance],
})

// Put entity rendering here, figure out how to re-abstract it