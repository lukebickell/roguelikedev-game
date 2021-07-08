import { Engine } from 'geotic'
import { Appearance, IsBlocking, IsInFov, IsOpaque, IsRevealed, Layer100, Layer300, EntityLayer, Move, Position } from './components'

//export const entityLocationCache = new EntityCache()

const engine = new Engine()

engine.registerComponent(Appearance)
engine.registerComponent(Position)
engine.registerComponent(Move)
engine.registerComponent(IsBlocking)
engine.registerComponent(IsInFov)
engine.registerComponent(IsOpaque)
engine.registerComponent(IsRevealed)
engine.registerComponent(Layer100)
engine.registerComponent(Layer300)
engine.registerComponent(EntityLayer)

const world = engine.createWorld()

const player = world.createEntity()
player.add(Appearance, { sprite: 'skeleton' })
player.add(EntityLayer)

export { player }

export default world
