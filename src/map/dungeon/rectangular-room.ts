import { Point } from "../../point"

export class RectangularRoom {
  x1: number
  y1: number
  x2: number
  y2: number

  private center: Point
  private inner: Point[]

  constructor(x: number, y: number, width: number, height: number) {
    this.x1 = x
    this.y1 = y
    this.x2 = x + width
    this.y2 = y + height

    this.center = this.calcCenter()
    this.inner = this.calcInner()
  }

  getCenter(): Point {
    return this.center
  }

  getInnerTiles(): Point[] {
    return this.inner
  }

  private calcCenter(): Point {
    const centerX = Math.floor((this.x1 + this.x2) / 2)
    const centerY = Math.floor((this.y1 + this.y2) / 2)

    return new Point(centerX, centerY)
  }

  private calcInner(): Point[] {
    const coordinates = []
    for (let i = this.x1+1; i < this.x2; i++) {
      for (let j = this.y1+1; j < this.y2; j++) {
        coordinates.push(new Point(i, j))
      }
    }
    return coordinates
  }

  intersects(other: RectangularRoom): boolean {
    // Return true if this room overlaps with the provided room
    return (
      this.x1 <= other.x2 &&
      this.x2 >= other.x1 &&
      this.y1 <= other.y2 &&
      this.y2 >= other.y1
    )
  }
}