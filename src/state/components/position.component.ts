import { Component } from "geotic"
import { EntityCaches } from "../cache"

export class Position extends Component {
  _x: number
  _y: number
  prevX: number
  prevY: number

  static properties = {
    x: 0,
    y: 0,
    prevX: 0,
    prevY: 0
  }

  get x(): number {
    return this._x
  }

  protected set x(value: number) {
    this._x = value
  }

  get y(): number {
    return this._y
  }

  protected set y(value: number) {
    this._y = value
  }

  onAttached(): void {
    EntityCaches.addEntityToLocationCache(this.x, this.y, this.entity)
  }

  setCoordinates(x: number, y: number): void {
    EntityCaches.deleteEntityFromLocation(this.x, this.y, this.entity)
    this.prevX = this.x
    this.prevY = this.y
    this._x = x
    this._y = y
    EntityCaches.addEntityToLocationCache(this.x, this.y, this.entity)
  }

  onXYChange(callback: (x: number, y: number) => void): void {
    for (const prop of ['x', 'y']) {
      let originalValue = this['prop']
      Object.defineProperty(this, prop, {
        get() {
          return originalValue
        },
        set(value: number) {
          this['prop'] = value
          callback(this['x'], this['y'])
        }
      })
    }
  }
}