import { Entity } from "geotic"
import { ClickController } from "./input/click-controller"
import { KeyboardInputController } from "./input/keyboard-input.controller"
import { FPS } from "./lib/fps"
import { Canvas } from "./map/canvas/canvas"
import { Dungeon } from "./map/dungeon/dungeon"
import { GridMap } from "./map/grid-map"
import { PrefabType } from "./state"
import { Action, IsDead } from "./state/components"
import world from "./state/ecs"
import { performActions } from "./systems/actions"
import { fov } from "./systems/fov"
import { renderEntities } from "./systems/render"

class Game {
  private gameAnimationFrame: number

  private dungeon: Dungeon
  //private inputController: KeyboardInputController
  private fpsCounter: FPS
  private player: Entity

  async initialize(): Promise<void> {
    console.log('Initializing Game...')
    this.fpsCounter = new FPS()
    await GridMap.spriteManager.loadSpriteMap()
    Canvas.initializeCanvas()
    
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
    if (this.player.has(IsDead)) {
      window.alert('You lost :(')
      return
    }
    this.fpsCounter.calculateFPS(timestamp)
    if (this.player.has(Action)) {
      performActions(this.player)
      //ai(this.player)
      fov(this.player['position'])
    }

    Canvas.clear()
    renderEntities(GridMap.drawCell)
    //GridMap.drawMatrixOverlay(EntityCaches.lastPFMatrix)
    //GridMap.drawOnCells(EntityCaches.lastPFPath)
    this.gameAnimationFrame = window.requestAnimationFrame(this.gameLoop)
  }
}

function start(): void {
  const game = new Game()
  game.initialize()
}

start()