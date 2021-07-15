import { Entity } from "geotic"
import { ClickController } from "./input/click-controller"
import { KeyboardInputController } from "./input/keyboard-input.controller"
import { FPS } from "./lib/fps"
import { Canvas } from "./map/canvas/canvas"
import { Dungeon } from "./map/dungeon/dungeon"
import { GridMap } from "./map/grid-map"
import { SpriteManager } from "./sprite/sprite-manager"
import { PrefabType } from "./state"
import { Action } from "./state/components"
import world from "./state/ecs"
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
  private player: Entity

  async initialize(): Promise<void> {
    console.log('Initializing Game...')
    this.fpsCounter = new FPS()
    this.spriteManager = new SpriteManager()
    await this.spriteManager.loadSpriteMap()
    Canvas.initializeCanvas()
    this.renderer = new GridMap(this.spriteManager)
    
    this.player = world.createPrefab(PrefabType.Player)
    new KeyboardInputController(this.player)
    new ClickController()

    this.dungeon = new Dungeon(this.player)

    this.dungeon.generateDungeon()

    fov(this.player['position'])
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
    if (this.player.has(Action)) {
      calculateMoves()
      fov(this.player['position'])
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