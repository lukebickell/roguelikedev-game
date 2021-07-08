import { Point } from "../point"

export enum TileType {
  NOTHING = 'dark_part_of_a_room',
  FLOOR = 'floor_of_a_room',
  WALL = 'dngn_stone_wall',
}

export class Tile {
  sprite: TileType
  position: Point

  constructor(sprite: TileType, point: Point) {
    this.sprite = sprite
    this.position = point
  }
}
