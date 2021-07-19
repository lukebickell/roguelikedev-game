import { Entity as GeoticEntity } from 'geotic'
import { SpriteManager } from "../sprite/sprite-manager"
import { Canvas } from "./canvas/canvas"
import { Appearance, IsInFov, Position } from "../state/components"
import { GridDimensions, TilePixelSize } from '../constants'

export class GridMap {
  static spriteManager: SpriteManager = new SpriteManager()

  static drawCell(entity: GeoticEntity): void {
    const position = entity['position'] as Position
    const appearance = (entity['appearance'] as Appearance)
    const isInFov = entity.has(IsInFov)

    if (appearance.backgroundSprite) {
      GridMap.drawSprite(position.x, position.y, appearance.backgroundSprite)
    }
    GridMap.drawSprite(position.x, position.y, appearance.sprite)
    if (appearance.foregroundSprite) {
      GridMap.drawSprite(position.x, position.y, appearance.foregroundSprite)
    }
    if (!isInFov) {
      GridMap.drawSquare(position.x, position.y, 'rgba(0, 0, 0, 0.4)')
    }
  }

  static drawSprite(x: number, y: number, sprite: string): void {
    Canvas.context.drawImage(
      GridMap.spriteManager.getSpriteSheet(),
      ...GridMap.spriteManager.getSprite(sprite),
      x * TilePixelSize.width, y * TilePixelSize.height,
      TilePixelSize.width, TilePixelSize.height
    )
  }

  static drawSquare(x: number, y: number, color: string): void {
    Canvas.drawSquare(
      x * TilePixelSize.width, y * TilePixelSize.height,
      TilePixelSize.width, TilePixelSize.height,
      color
    )
  }

  static renderGrid(): void  {
    for (let i = 0; i < GridDimensions.height; i++) {
      const y = i * TilePixelSize.height
      const x = GridDimensions.width * TilePixelSize.width
      Canvas.drawLine(0, y, x, y)
    }
    for (let i = 0; i < GridDimensions.width; i++) {
      const x = i * TilePixelSize.width
      const y = GridDimensions.height * TilePixelSize.height
      Canvas.drawLine(x, 0, x, y)
    }
  }

  static drawMatrixOverlay(matrix: number[][]): void {
    if (!matrix[0]) return
    for (let i = 0; i < matrix[0].length; i++) {
      for (let j = 0; j < matrix.length; j++) {
        let color = 'rgba(245, 0, 0, 0.4)'
        if (matrix[j][i] > 0) {
          GridMap.drawSquare(i, j, color)
        }
      }
    }
  }

  static drawOnCells(points: number[][]): void {
    for (let i = 0; i < points.length; i++) {
      GridMap.drawSquare(points[i][0], points[i][1], 'rgba(0, 0, 128, 0.4)')
    }
  }

}