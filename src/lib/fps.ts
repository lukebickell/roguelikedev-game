export class FPS {
  private previousTime: number
  private _fps: number

  get fps(): number {
    return this._fps
  }

  calculateFPS(timestamp: number) {
    const secondsPassed = (timestamp - this.previousTime) / 1000
    this.previousTime = timestamp
    this._fps = Math.round(1 / secondsPassed)
  }
}