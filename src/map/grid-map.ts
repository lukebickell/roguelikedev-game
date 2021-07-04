import { Entity } from "../entities/entity"
import { Point } from "../point"
import { SpriteManager } from "../sprite/sprite-manager"
import { CanvasContext } from "./canvas/canvas"
import { Tile } from "./tile-type.enum"

export class GridMap {
  private map: number[][] = []
  private tilePixelHeight = 32
  private tilePixelWidth = 32
  private canvasContext: CanvasContext

  entities: Entity[] = []

  constructor(
    private readonly _widthInTiles: number,
    private readonly _heightInTiles: number,
    private readonly spriteManager: SpriteManager,
  ) {
    const canvasPixelWidth = this._widthInTiles * this.tilePixelWidth
    const canvasPixelHeight = this._heightInTiles * this.tilePixelHeight
    this.canvasContext = new CanvasContext(canvasPixelWidth, canvasPixelHeight)
    this.initializeMap()
  }

  get width(): number {
    return this._widthInTiles
  }

  get height(): number {
    return this._heightInTiles
  }

  private initializeMap(): void {
    for (let i = 0; i < this._heightInTiles; i++) {
      this.map[i] = []
      for (let j = 0; j < this._widthInTiles; j++) {
        this.map[i][j] = Tile.WALL
      }
    }
  }

  updateMap(): void {
    this.drawBackground()
    for (const entity of this.entities) {
      entity.calculateMovement()
      this.checkMovementLegality(entity)
      this.renderEntity(entity)
    }
    //this.drawGrid()
  }

  setTiles(coordinates: Point[], tileType: Tile): void {
    for (const coord of coordinates) {
      this.map[coord.y][coord.x] = tileType
    }
  }

  drawBackground(): void {
    // Fill in tiles
    for (let i = 0; i < this.map.length; i++) {
      for (let j = 0; j < this.map[0].length; j++) {
        let color = 'white'
        switch (this.map[i][j]) {
          case (Tile.FLOOR):
            color = 'green'
            break
          case (Tile.WALL):
            color = 'blue'
            break
        }

        this.canvasContext.drawSquare(
          j * this.tilePixelWidth,
          i * this.tilePixelHeight,
          this.tilePixelWidth,
          this.tilePixelHeight,
          color)
      }
    }
  }

  checkMovementLegality(entity: Entity): void {
    if (this.entityCollidesWithGridBoundaries(entity) ||
      this.entityCollidesWithObstace(entity)) {
      entity.sendToPreviousPosition()
    }
  }

  private entityCollidesWithGridBoundaries(entity: Entity): boolean {
    const entityCoords = entity.getCoordinates()
    return (entityCoords.x > this.map[0].length - 1) ||
      (entityCoords.x < 0) ||
      (entityCoords.y > this.map.length - 1) ||
      (entityCoords.y < 0)
  }

  private entityCollidesWithObstace(entity: Entity): boolean {
    const entityCoords = entity.getCoordinates()
    return (this.map[entityCoords.y][entityCoords.x] === Tile.WALL) 
  }

  renderEntity(entity: Entity): void {
    const entityCoords = entity.getCoordinates()
    this.canvasContext.context.drawImage(
      this.spriteManager.getSpriteSheet(),
      ...this.spriteManager.getSprite(entity.sprite),
      entityCoords.x * this.tilePixelWidth, entityCoords.y * this.tilePixelHeight,
      this.tilePixelWidth, this.tilePixelHeight
    )
  }

  renderGrid(): void  {
    for (let i = 0; i < this._heightInTiles; i++) {
      const y = i * this.tilePixelHeight
      const x = this._widthInTiles * this.tilePixelWidth
      this.canvasContext.drawLine(0, y, x, y)
    }
    for (let i = 0; i < this._widthInTiles; i++) {
      const x = i * this.tilePixelWidth
      const y = this._heightInTiles * this.tilePixelHeight
      this.canvasContext.drawLine(x, 0, x, y)
    }
  }

  tunnelBetween(start: Point, end: Point): Point[] {
    const coords: Point[] = []
    let x1 = start.x
    let y1 = start.y
    const x2 = end.x
    const y2 = end.y

    // Bresenham - https://www.redblobgames.com/grids/line-drawing.html
    const dx = x2 - x1
    const dy = y2 - y1

    let nx = Math.abs(dx)
    let ny = Math.abs(dy)
    let sign_x = dx > 0? 1 : -1
    let sign_y = dy > 0? 1 : -1

    let p: Point = new Point(x1, y1)
    coords.push(p.duplicate())
    for (let ix = 0, iy = 0; ix < nx || iy < ny;) {
        if ((0.5+ix) / nx < (0.5+iy) / ny) {
            // next step is horizontal
            p.x += sign_x;
            ix++;
        } else {
            // next step is vertical
            p.y += sign_y;
            iy++;
        }
        coords.push(p.duplicate());
    }

    return coords
  }

}