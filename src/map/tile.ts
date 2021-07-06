export namespace Tiles {
  export enum TileType {
    NOTHING = 0,
    FLOOR = 1,
    WALL = 2,
  }

  export const TileMap: Map<TileType, string> = 
    new Map([
      [TileType.NOTHING, 'dark_part_of_a_room'],
      [TileType.FLOOR, 'floor_of_a_room'],
      [TileType.WALL, 'dngn_stone_wall'],
    ])
}