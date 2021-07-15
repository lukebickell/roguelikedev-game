import { Entity as GeoticEntity } from 'geotic'
import { SpriteManager } from "../sprite/sprite-manager"
import { Canvas } from "./canvas/canvas"
import { Appearance, IsInFov, Position } from "../state/components"
import { GridDimensions } from '../constants'

export class GridMap {
  // private map: number[][] = []
  private tilePixelHeight = 32
  private tilePixelWidth = 32

  constructor(
    private readonly spriteManager: SpriteManager,
  ) { }

  // private initializeMap(): void {
  //   for (let i = 0; i < GridDimensions.height; i++) {
  //     this.map[i] = []
  //     for (let j = 0; j < GridDimensions.width; j++) {
  //       this.map[i][j] = Tiles.TileType.WALL
  //     }
  //   }
  // }

  updateMap(): void {
    //this.drawBackground()
    //this.drawGrid()
  }

  // setTiles(coordinates: Point[], tileType: Tiles.TileType): void {
  //   for (const coord of coordinates) {
  //     this.map[coord.y][coord.x] = tileType
  //   }
  // }

  // drawBackground(): void {
  //   // Fill in tiles
  //   for (let i = 0; i < this.map.length; i++) {
  //     for (let j = 0; j < this.map[0].length; j++) {
  //       this.renderTile(this.map[i][j], j, i)
  //     }
  //   }
  // }

  // checkMovementLegality(entity: Entity): void {
  //   if (this.entityCollidesWithGridBoundaries(entity) ||
  //     this.entityCollidesWithObstace(entity)) {
  //     entity.sendToPreviousPosition()
  //   }
  // }

  // private entityCollidesWithGridBoundaries(entity: Entity): boolean {
  //   const entityCoords = entity.getCoordinates()
  //   return (entityCoords.x > this.map[0].length - 1) ||
  //     (entityCoords.x < 0) ||
  //     (entityCoords.y > this.map.length - 1) ||
  //     (entityCoords.y < 0)
  // }

  // private entityCollidesWithObstace(entity: Entity): boolean {
  //   const entityCoords = entity.getCoordinates()
  //   return (this.map[entityCoords.y][entityCoords.x] === Tiles.TileType.WALL) 
  // }

  drawCell(entity: GeoticEntity): void {
    const position = entity['position'] as Position
    const appearance = (entity['appearance'] as Appearance)
    const isInFov = entity.has(IsInFov)

    if (appearance.backgroundSprite) {
      this.drawSprite(position.x, position.y, appearance.backgroundSprite)
    }
    this.drawSprite(position.x, position.y, appearance.sprite)
    if (appearance.foregroundSprite) {
      this.drawSprite(position.x, position.y, appearance.foregroundSprite)
    }
    if (!isInFov) {
      this.drawSquare(position.x, position.y, 'rgba(0, 0, 0, 0.4)')
    }
  }

  drawSprite(x: number, y: number, sprite: string): void {
    Canvas.context.drawImage(
      this.spriteManager.getSpriteSheet(),
      ...this.spriteManager.getSprite(sprite),
      x * this.tilePixelWidth, y * this.tilePixelHeight,
      this.tilePixelWidth, this.tilePixelHeight
    )
  }

  drawSquare(x: number, y: number, color: string): void {
    Canvas.drawSquare(
      x * this.tilePixelWidth, y * this.tilePixelHeight,
      this.tilePixelWidth, this.tilePixelHeight,
      color
    )
  }

  renderGrid(): void  {
    for (let i = 0; i < GridDimensions.height; i++) {
      const y = i * this.tilePixelHeight
      const x = GridDimensions.width * this.tilePixelWidth
      Canvas.drawLine(0, y, x, y)
    }
    for (let i = 0; i < GridDimensions.width; i++) {
      const x = i * this.tilePixelWidth
      const y = GridDimensions.height * this.tilePixelHeight
      Canvas.drawLine(x, 0, x, y)
    }
  }

}