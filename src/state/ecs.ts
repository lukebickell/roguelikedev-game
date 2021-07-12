import { Engine } from 'geotic'
import { Appearance, IsBlocking, IsInFov, IsOpaque, IsRevealed, Layer100, Layer300, CreatureLayer, Position, Description, Action } from './components'

//export const entityLocationCache = new EntityCache()

const engine = new Engine()

engine.registerComponent(Appearance)
engine.registerComponent(Position)
engine.registerComponent(Action)
engine.registerComponent(Description)
engine.registerComponent(IsBlocking)
engine.registerComponent(IsInFov)
engine.registerComponent(IsOpaque)
engine.registerComponent(IsRevealed)
engine.registerComponent(Layer100)
engine.registerComponent(Layer300)
engine.registerComponent(CreatureLayer)

const world = engine.createWorld()

const player = world.createEntity()
player.add(Appearance, { sprite: 'golden_dragon' })
player.add(CreatureLayer)
player.add(Description, { name: "You" })

export { player }

export default world
