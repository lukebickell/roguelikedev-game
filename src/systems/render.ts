import world from '../state/ecs'
import { Appearance, Layer100, Layer300, CreatureLayer, Position, IsInFov, IsRevealed } from '../state/components'
import { Entity, Query } from 'geotic'

export const renderableEntities = world.createQuery({
  all: [Position, Appearance],
})

export const layerQueries: Query[] = [
  world.createQuery({ all: [Appearance, Position, Layer100], any: [IsInFov, IsRevealed] }),
  world.createQuery({ all: [Appearance, Position, Layer300], any: [IsInFov, IsRevealed] }),
  world.createQuery({ all: [Appearance, Position, CreatureLayer, IsInFov] })
]

// Put entity rendering here, figure out how to re-abstract it
export function renderEntities(drawFn: (entity: Entity) => void): void {
  for (const layer of layerQueries) {
    for (const entity of layer.get()) {
      drawFn(entity)
    }
  }
}
