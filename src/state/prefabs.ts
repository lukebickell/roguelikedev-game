import { PrefabData } from 'geotic'
import { ComponentName } from '.'
import { TileType } from '../map/tile'

export const enum PrefabType { Tile = 'tile', Being = 'being', Wall = 'wall', Floor = 'floor', Player = 'player', Dingo = 'dingo' }

export const BasePrefabs: PrefabData[] = [
  {
    name: PrefabType.Tile,
    components: [
      { type: ComponentName.Appearance },
      { type: ComponentName.Description },
      { type: ComponentName.Layer100 },
    ]
  },
  {
    name: PrefabType.Being,
    components: [
      { type: ComponentName.Health },
      { type: ComponentName.Defense },
      { type: ComponentName.Power },
      { type: ComponentName.Appearance },
      { type: ComponentName.Description },
      { type: ComponentName.IsBlocking },
      { type: ComponentName.CreatureLayer },
    ]
  },
]

export const Prefabs: PrefabData[] = [
  {
    name: PrefabType.Wall,
    inherit: [ PrefabType.Tile ],
    components: [
      { type: ComponentName.IsBlocking },
      { type: ComponentName.IsOpaque },
      {
        type: ComponentName.Appearance,
        properties: { sprite: TileType.WALL },
      },
      {
        type: ComponentName.Description,
        properties: { name: 'wall' },
      },
    ],
  },
  {
    name: PrefabType.Floor,
    inherit: [ PrefabType.Tile ],
    components: [
      {
        type: ComponentName.Appearance,
        properties: { sprite: TileType.FLOOR },
      },
      {
        type: ComponentName.Description,
        properties: { name: 'floor' },
      },
    ],
  },
  {
    name: PrefabType.Player,
    inherit: [ PrefabType.Being ],
    components: [
      {
        type: ComponentName.Appearance,
        properties: { sprite: 'golden_dragon' },
      },
      { 
        type: ComponentName.Power,
        properties: { max: 5, current: 5 },
      },
      {
        type: ComponentName.Description,
        properties: { name: 'you' },
      },
    ],
  },
  {
    name: PrefabType.Dingo,
    inherit: [ PrefabType.Being ],
    components: [
      { type: ComponentName.Ai },
      {
        type: ComponentName.Appearance,
        properties: { sprite: 'dingo' },
      },
      {
        type: ComponentName.Description,
        properties: { name: 'dingo' },
      },
      { 
        type: ComponentName.Power,
        properties: { max: 2, current: 2 },
      },
    ],
  }
]
