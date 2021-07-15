import { Point } from "../point"
import { PrefabType } from "../state"

export enum TileType {
  NOTHING = 'dark_part_of_a_room',
  FLOOR = 'floor_of_a_room',
  WALL = 'dngn_stone_wall',
}

export class Tile {
  prefab: PrefabType
  position: Point

  constructor(prefab: PrefabType, point: Point) {
    this.prefab = prefab
    this.position = point
  }
}
