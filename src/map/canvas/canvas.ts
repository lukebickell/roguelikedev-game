export class CanvasContext {
  private canvas: HTMLCanvasElement
  private _context: CanvasRenderingContext2D

  constructor(
    private readonly width: number,
    private readonly height: number
  ) {
    this.initializeCanvas()
  }

  get context(): CanvasRenderingContext2D {
    return this._context
  }

  private initializeCanvas(): void {
    this.canvas = document.createElement('canvas')
    this.canvas.width = this.width
    this.canvas.height = this.height
    this._context = this.canvas.getContext('2d')
    document.body.insertBefore(this.canvas, document.body.childNodes[0])
  }

  drawSquare(x: number, y: number, width: number, height: number, color: string): void {
    this._context.beginPath()
    this._context.rect(x, y, width, height)
    this._context.fillStyle = color
    this._context.fill()
    this._context.closePath()
  }

  drawLine(x1: number, y1: number, x2: number, y2: number): void {
    this._context.beginPath()
    this._context.lineWidth = 3
    this._context.moveTo(x1, y1)
    this._context.lineTo(x2, y2)
    this._context.stroke()
    this._context.closePath()
  }
  
  clear(): void {
    this._context.clearRect(0, 0, this.width, this.height)
  }
}