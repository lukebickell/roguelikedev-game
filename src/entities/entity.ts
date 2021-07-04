import { Point } from "../point"

export abstract class Entity {
  private prevX: number
  private prevY: number
  name: string
  speed: number = 1


  constructor(
    private x: number,
    private y: number,
    private _sprite: string
  ) {
    this.setCoordinates(x, y)
  }

  get sprite(): string {
    return this._sprite
  }

  protected setSprite(sprite: string): void {
    this._sprite = sprite
  }

  abstract calculateMovement(): void 

  setCoordinates(x: number, y: number): void {
    this.prevX = this.x
    this.prevY = this.y
    this.x = x
    this.y = y
  }

  translate(deltaX: number, deltaY: number) {
    this.setCoordinates(this.x + deltaX, this.y + deltaY)
  }

  setCoordinatesByPoint(point: Point): void {
    this.setCoordinates(point.x, point.y)
  }

  getCoordinates(): Point {
    return new Point(this.x, this.y)
  }

  getPreviousCoordinates(): Point {
    return new Point(this.prevX, this.prevY)
  }

  sendToPreviousPosition(): void {
    this.x = this.prevX
    this.y = this.prevY
  }
}