import { Player } from "../../entities/player";
import { GridMap } from "../grid-map";
import { Tile } from "../tile-type.enum";
import { RectangularRoom } from "./rectangular-room";

export class Dungeon {
  private readonly maxRoomSize = 9
  private readonly minRoomSize = 6
  private readonly maxRooms = 20

  constructor(
    private readonly gridMap: GridMap
  ) { }

  updateDungeon(): void {

  }

  generateDungeon(player: Player): void {
    const rooms: RectangularRoom[] = []
    this.gridMap.entities.push(player)
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
        this.gridMap.setTiles(newRoom.getInnerTiles(), Tile.FLOOR)
      } catch (error) {
        console.log(newRoom)
      }
      if (rooms.length === 0) {
        player.setCoordinatesByPoint(newRoom.getCenter())
      } else {
        const previousRoom = rooms[rooms.length-1]
        const tunnelTiles = this.gridMap.tunnelBetween(previousRoom.getCenter(), newRoom.getCenter())
        this.gridMap.setTiles(tunnelTiles, Tile.FLOOR)
      }

      rooms.push(newRoom)
    }
  }

  private randomInt(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min
  }

}