import { Player } from "./entities/player"
import { KeyboardInputController } from "./input/keyboard-input.controller"
import { Dungeon } from "./map/dungeon/dungeon"
import { GridMap } from "./map/grid-map"
import { SpriteManager } from "./sprite/sprite-manager"

class Game {
  private interval: number

  private renderer: GridMap
  private dungeon: Dungeon
  private inputController: KeyboardInputController
  private spriteManager: SpriteManager

  constructor(
    private readonly width: number, 
    private readonly height: number
  ) {}

  async initialize(): Promise<void> {
    console.log('Initializing Game...')
    this.inputController = new KeyboardInputController()
    this.spriteManager = new SpriteManager()
    await this.spriteManager.loadSpriteMap()
    this.renderer = new GridMap(this.width, this.height, this.spriteManager)
    this.dungeon = new Dungeon(this.renderer)

    const player = new Player(this.inputController)
    this.dungeon.generateDungeon(player)

    this.startGameLoop()
  }

  endGame(): void {
    alert('Game Over')
    document.location.reload();
    window.clearInterval(this.interval)
  }

  private startGameLoop(): void {
    this.interval = window.setInterval(this.gameLoop.bind(this), 200)
  }

  private gameLoop = () => {
    this.dungeon.updateDungeon()
    this.renderer.updateMap()
  }
}

const WIDTH = 48
const HEIGHT = 28

function start(): void {
  const gameArea = new Game(WIDTH, HEIGHT)
  gameArea.initialize()
}

start()