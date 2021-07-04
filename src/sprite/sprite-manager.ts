import * as spriteList from '../assets/sprites/rltiles-2d.json'
import spriteSheet from '../assets/sprites/rltiles-2d.png'

export class SpriteManager {
  private spriteMap: Map<string, number> = new Map()
  private _spriteSize: number
  private spritesPerRow: number
  private spriteImg: HTMLImageElement

  async loadSpriteMap() {
    this.spriteImg = await this.loadSpriteImage()
    this._spriteSize = spriteList.tileSize
    this.spritesPerRow = spriteList.width

    for (let i = 0; i < spriteList.tiles.length; i++) {
      this.spriteMap.set(spriteList.tiles[i], i)
    }
  }

  private loadSpriteImage(): Promise<HTMLImageElement> {
    return new Promise((resolve, reject) => {
      let img = new Image()
      img.onload = () => resolve(img)
      img.onerror = reject
      img.src = spriteSheet
    })
  }

  get spriteSize(): number {
    return this._spriteSize
  }

  getSpriteSheet(): HTMLImageElement {
    return this.spriteImg
  }

  getSprite(spriteName: string): [number, number, number, number] {
    const index = this.spriteMap.get(spriteName)
    const row = Math.floor(index / this.spritesPerRow)
    const x1 = (index % this.spritesPerRow) * this.spriteSize
    const y1 = row * this.spriteSize
    return [x1, y1, this.spriteSize, this.spriteSize]
  }
}