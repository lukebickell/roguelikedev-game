import { Point } from '../../point'
import { Position } from '../../state/components'
import world from '../../state/ecs'
import { Tile } from '../tile'
import { RectangularRoom } from './rectangular-room'
import { Entity } from 'geotic'
import { PrefabType } from '../../state'
import { GridDimensions } from '../../constants'
import { tunnelBetween } from '../../lib/grid'

export class Dungeon {
  private readonly maxRoomSize = 9
  private readonly minRoomSize = 6
  private readonly maxRooms = 20
  private _tiles: { [key: string]: Tile } = {}

  constructor(
    private readonly player: Entity
  ) { }

  updateDungeon(): void {

  }

  generateDungeon(): void {
    const coords: Point[] = []
    for (let i = 0; i < GridDimensions.width; i++) {
      for (let j = 0; j < GridDimensions.height; j++) {
        coords.push(new Point(i, j))
      }
    }
    this.setTiles(coords, PrefabType.Wall)


    const rooms: RectangularRoom[] = []
    for (let r = 0; r < this.maxRooms; r++) {
      const roomWidth = this.randomInt(this.minRoomSize, this.maxRoomSize)
      const roomHeight = this.randomInt(this.minRoomSize, this.maxRoomSize)

      const x = this.randomInt(0, GridDimensions.width - roomWidth - 1)
      const y = this.randomInt(0, GridDimensions.height - roomHeight - 1)

      const newRoom = new RectangularRoom(x, y, roomWidth, roomHeight)

      let valid = true
      for (const room of rooms) {
        if (newRoom.intersects(room)) {
          valid = false
        }
      }
      if (!valid) continue

      try {
        this.setTiles(newRoom.getInnerTiles(), PrefabType.Floor)
      } catch (error) {
        console.log(newRoom)
      }
      if (rooms.length === 0) {
        const spawn = newRoom.getCenter()
        this.player.add(Position, {
          x: spawn.x,
          y: spawn.y,
        })
      } else {
        const previousRoom = rooms[rooms.length-1]
        const tunnelTiles = tunnelBetween(previousRoom.getCenter(), newRoom.getCenter())
        this.setTiles(tunnelTiles, PrefabType.Floor)

        // Create mobs
        const spawn = newRoom.getCenter()
        world.createPrefab(PrefabType.Dingo)
          .add(Position, {
            x: spawn.x,
            y: spawn.y,
          })
      }

      rooms.push(newRoom)
    }

    this.createTileEntities()
  }

  private setTiles(coords: Point[], tileType: PrefabType): void {
    for (const coord of coords) {
      this._tiles[`${coord.x},${coord.y}`] = new Tile(tileType, new Point(coord.x, coord.y))
    }
  }

  private createTileEntities(): void {
    for (const tilePos of Object.keys(this._tiles)) {
      const tile = this._tiles[tilePos]
      const position = { x: tile.position.x, y: tile.position.y }

      world.createPrefab(tile.prefab).add(Position, position)
    }
  }

  private randomInt(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min
  }

}