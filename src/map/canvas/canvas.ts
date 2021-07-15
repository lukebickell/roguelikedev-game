import { CanvasSize, TilePixelSize } from "../../constants"

export class Canvas {
  static canvas: HTMLCanvasElement
  static context: CanvasRenderingContext2D

  static initializeCanvas(): void {
    this.canvas = document.createElement('canvas')
    this.canvas.width = CanvasSize.width
    this.canvas.height = CanvasSize.height
    this.context = this.canvas.getContext('2d')
    document.body.insertBefore(this.canvas, document.body.childNodes[0])
  }

  static drawSquare(x: number, y: number, width: number, height: number, color: string): void {
    this.context.beginPath()
    this.context.rect(x, y, width, height)
    this.context.fillStyle = color
    this.context.fill()
    this.context.closePath()
  }

  static drawLine(x1: number, y1: number, x2: number, y2: number): void {
    this.context.beginPath()
    this.context.lineWidth = 3
    this.context.moveTo(x1, y1)
    this.context.lineTo(x2, y2)
    this.context.stroke()
    this.context.closePath()
  }
  
  static clear(): void {
    this.context.clearRect(0, 0, CanvasSize.width, CanvasSize.height)
  }

  static pxToCell(canvasX: number, canvasY: number): [number, number] {
    const bounds = this.canvas.getBoundingClientRect();
    const relativeX = canvasX - bounds.left
    const relativeY = canvasY - bounds.top
    const colPos = Math.trunc((relativeX / TilePixelSize.width))
    const rowPos = Math.trunc((relativeY / TilePixelSize.height))
  
    return [colPos, rowPos]
  }
}