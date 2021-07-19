import { Position } from "./state"

export class Point {
  x: number
  y: number

  constructor(x: number, y: number) {
    this.x = x
    this.y = y
  }

  static fromPosition(position: Position): Point {
    return new this(position.x, position.y)
  }

  duplicate(): Point {
    return new Point(this.x, this.y)
  }
}