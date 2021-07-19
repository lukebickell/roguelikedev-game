import { Engine } from 'geotic'
import { Appearance, IsBlocking, IsInFov, IsOpaque, IsRevealed, Layer100, Layer300, CreatureLayer, Position, Description, Action, Ai, Defense, Health, Power, IsDead } from './components'
import { BasePrefabs, Prefabs } from './prefabs'

//export const entityLocationCache = new EntityCache()
export const enum ComponentName { 
  Appearance = 'Appearance', 
  Position = 'Position', 
  Ai = 'Ai', 
  Description = 'Description', 
  IsBlocking = 'IsBlocking', 
  IsInFov = 'IsInFov', 
  IsOpaque = 'IsOpaque', 
  IsRevealed = 'IsRevealed', 
  Layer100 = 'Layer100', 
  Layer300 = 'Layer300', 
  CreatureLayer = 'CreatureLayer',
  Defense = 'Defense',
  Health = 'Health',
  Power = 'Power',
  IsDead = 'IsDead',
}

const engine = new Engine()

engine.registerComponent(Appearance)
engine.registerComponent(Position)
engine.registerComponent(Action)
engine.registerComponent(Ai)
engine.registerComponent(Description)
engine.registerComponent(IsBlocking)
engine.registerComponent(IsInFov)
engine.registerComponent(IsOpaque)
engine.registerComponent(IsRevealed)
engine.registerComponent(Layer100)
engine.registerComponent(Layer300)
engine.registerComponent(CreatureLayer)
engine.registerComponent(Defense)
engine.registerComponent(Health)
engine.registerComponent(Power)
engine.registerComponent(IsDead)

for (const prefab of BasePrefabs) {
  engine.registerPrefab(prefab)
}
for (const prefab of Prefabs) {
  engine.registerPrefab(prefab)
}

const world = engine.createWorld()

export default world
