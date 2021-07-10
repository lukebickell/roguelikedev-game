import { KeyboardInputController } from "./input/keyboard-input.controller"
import { FPS } from "./lib/fps"
import { Dungeon } from "./map/dungeon/dungeon"
import { GridMap } from "./map/grid-map"
import { SpriteManager } from "./sprite/sprite-manager"

class Game {
  private animationFrame: number

  private renderer: GridMap
  private dungeon: Dungeon
  private inputController: KeyboardInputController
  private spriteManager: SpriteManager
  private fpsCounter: FPS

  constructor(
    private readonly width: number, 
    private readonly height: number
  ) {}

  async initialize(): Promise<void> {
    console.log('Initializing Game...')
    this.fpsCounter = new FPS()
    this.inputController = new KeyboardInputController()
    this.spriteManager = new SpriteManager()
    await this.spriteManager.loadSpriteMap()
    this.renderer = new GridMap(this.width, this.height, this.spriteManager, this.inputController)
    this.dungeon = new Dungeon(this.renderer)

    this.dungeon.generateDungeon()

    this.animationFrame = window.requestAnimationFrame(this.gameLoop)

    //this.startGameLoop()
  }

  endGame(): void {
    alert('Game Over')
    document.location.reload();
    window.cancelAnimationFrame(this.animationFrame)
  }

  // private startGameLoop(): void {
  //   this.interval = window.setInterval(this.gameLoop.bind(this), 16)
  // }

  private gameLoop = (timestamp: number) => {

    this.fpsCounter.calculateFPS(timestamp)

    this.dungeon.updateDungeon()
    this.renderer.updateMap()
    this.animationFrame = window.requestAnimationFrame(this.gameLoop)
  }
}

const WIDTH = 48
const HEIGHT = 28

function start(): void {
  const gameArea = new Game(WIDTH, HEIGHT)
  gameArea.initialize()
}

start()