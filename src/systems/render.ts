import world from '../state/ecs'
import { Appearance, Layer100, Layer300, EntityLayer, Position, IsInFov, IsRevealed } from '../state/components'
import { Entity, Query } from 'geotic'

export const renderableEntities = world.createQuery({
  all: [Position, Appearance],
})

const anyFov = [IsInFov, IsRevealed]
export const layerQueries: Query[] = [
  world.createQuery({ all: [Appearance, Position, Layer100], any: anyFov }),
  world.createQuery({ all: [Appearance, Position, Layer300], any: anyFov}),
  world.createQuery({ all: [Appearance, Position, EntityLayer, IsInFov] })
]

// Put entity rendering here, figure out how to re-abstract it
export function renderEntities(drawFn: (entity: Entity) => void): void {
  for (const layer of layerQueries) {
    for (const entity of layer.get()) {
      drawFn(entity)
    }
  }
}
