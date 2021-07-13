import { GridDimensions } from "./constants"
import { KeyboardInputController } from "./input/keyboard-input.controller"
import { FPS } from "./lib/fps"
import { Dungeon } from "./map/dungeon/dungeon"
import { GridMap } from "./map/grid-map"
import { SpriteManager } from "./sprite/sprite-manager"
import { Action } from "./state/components"
import { player } from "./state/ecs"
import { calculateMoves } from "./systems/actions"
import { ai } from "./systems/ai"
import { fov } from "./systems/fov"
import { renderEntities } from "./systems/render"

class Game {
  private gameAnimationFrame: number

  private renderer: GridMap
  private dungeon: Dungeon
  //private inputController: KeyboardInputController
  private spriteManager: SpriteManager
  private fpsCounter: FPS

  async initialize(): Promise<void> {
    console.log('Initializing Game...')
    this.fpsCounter = new FPS()
    new KeyboardInputController()
    this.spriteManager = new SpriteManager()
    await this.spriteManager.loadSpriteMap()
    this.renderer = new GridMap(GridDimensions.width, GridDimensions.height, this.spriteManager)
    this.dungeon = new Dungeon(this.renderer)

    this.dungeon.generateDungeon()

    fov()
    this.gameAnimationFrame = window.requestAnimationFrame(this.gameLoop)

    //this.startGameLoop()
  }

  endGame(): void {
    alert('Game Over')
    document.location.reload();
    window.cancelAnimationFrame(this.gameAnimationFrame)
  }

  // private startGameLoop(): void {
  //   this.interval = window.setInterval(this.gameLoop.bind(this), 16)
  // }

  private gameLoop = (timestamp: number) => {

    this.fpsCounter.calculateFPS(timestamp)
    if (player.has(Action)) {
      calculateMoves()
      fov()
      ai()
    }

    renderEntities(this.renderer.drawCell.bind(this.renderer))
    this.gameAnimationFrame = window.requestAnimationFrame(this.gameLoop)
  }
}

function start(): void {
  const game = new Game()
  game.initialize()
}

start()