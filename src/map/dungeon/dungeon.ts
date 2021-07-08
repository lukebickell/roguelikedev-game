import { Point } from "../../point"
import { Appearance, IsBlocking, Layer100, Position } from "../../state/components"
import { player } from "../../state/ecs"
import { GridMap } from "../grid-map"
import { Tile, TileType } from "../tile"
import { RectangularRoom } from "./rectangular-room"
import engine from '../../state/ecs'

export class Dungeon {
  private readonly maxRoomSize = 9
  private readonly minRoomSize = 6
  private readonly maxRooms = 20
  private _tiles: { [key: string]: Tile } = {}

  constructor(
    private readonly gridMap: GridMap
  ) { }

  updateDungeon(): void {

  }

  generateDungeon(): void {
    const coords: Point[] = []
    for (let i = 0; i < this.gridMap.width; i++) {
      for (let j = 0; j < this.gridMap.height; j++) {
        coords.push(new Point(i, j))
      }
    }
    this.setTiles(coords, TileType.WALL)


    const rooms: RectangularRoom[] = []
    for (let r = 0; r < this.maxRooms; r++) {
      const roomWidth = this.randomInt(this.minRoomSize, this.maxRoomSize)
      const roomHeight = this.randomInt(this.minRoomSize, this.maxRoomSize)

      const x = this.randomInt(0, this.gridMap.width - roomWidth - 1)
      const y = this.randomInt(0, this.gridMap.height - roomHeight - 1)

      const newRoom = new RectangularRoom(x, y, roomWidth, roomHeight)

      let valid = true
      for (const room of rooms) {
        if (newRoom.intersects(room)) {
          valid = false
        }
      }
      if (!valid) continue

      try {
        this.setTiles(newRoom.getInnerTiles(), TileType.FLOOR)
      } catch (error) {
        console.log(newRoom)
      }
      if (rooms.length === 0) {
        const spawn = newRoom.getCenter()
        const position = player['position'] as Position
        position.setCoordinates(spawn.x, spawn.y)
      } else {
        const previousRoom = rooms[rooms.length-1]
        const tunnelTiles = this.gridMap.tunnelBetween(previousRoom.getCenter(), newRoom.getCenter())
        this.setTiles(tunnelTiles, TileType.FLOOR)
      }

      rooms.push(newRoom)
    }

    this.createTileEntities()
  }

  private setTiles(coords: Point[], tileType: TileType): void {
    for (const coord of coords) {
      this._tiles[`${coord.x},${coord.y}`] = new Tile(tileType, new Point(coord.x, coord.y))
    }
  }

  private createTileEntities(): void {
    for (const tilePos of Object.keys(this._tiles)) {
      const entity = engine.createEntity()
      const tile = this._tiles[tilePos]
      entity.add(Appearance, { sprite: tile.sprite})
      entity.add(Position, { x: tile.position.x, y: tile.position.y })
      entity.add(Layer100)

      if (tile.sprite === TileType.WALL) {
        entity.add(IsBlocking)
      }
    }
  }

  private randomInt(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min
  }

}