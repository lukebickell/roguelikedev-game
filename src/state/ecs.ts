import { Engine } from 'geotic'
import { Appearance, Move, Position } from './component'

const engine = new Engine()

engine.registerComponent(Appearance)
engine.registerComponent(Position)
engine.registerComponent(Move)

const world = engine.createWorld()

export const player = world.createEntity()
player.add(Appearance, { sprite: 'skeleton' })
player.add(Position)
player.add(Move)

export default world
