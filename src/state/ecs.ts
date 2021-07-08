import { Engine } from 'geotic'
import { Appearance, IsBlocking, Layer100, Layer300, Layer400, Move, Position } from './components'

//export const entityLocationCache = new EntityCache()

const engine = new Engine()

engine.registerComponent(Appearance)
engine.registerComponent(Position)
engine.registerComponent(Move)
engine.registerComponent(IsBlocking)
engine.registerComponent(Layer100)
engine.registerComponent(Layer300)
engine.registerComponent(Layer400)

const world = engine.createWorld()

const player = world.createEntity()
player.add(Appearance, { sprite: 'skeleton' })
player.add(Position)
player.add(Layer400)

export { player }

export default world
