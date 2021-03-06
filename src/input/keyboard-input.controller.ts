import { Entity } from "geotic"
import { Action, Walk } from "../state/action"

enum InputKey {
  ArrowRight = 'ArrowRight',
  ArrowLeft = 'ArrowLeft',
  ArrowUp = 'ArrowUp',
  ArrowDown = 'ArrowDown',
}

export class KeyboardInputController {
  private keysPressed: { [key: string]: boolean } = {}

  constructor(private readonly player: Entity) {
    this.initializeListeners()
  }

  private playerInputTrigger(): void {

    if (this.arrowIsPressed()) {
      this.addPlayerMove()
    }
  }

  private addPlayerMove(): void {
    let deltaX = 0
    let deltaY = 0
    if (this.keysPressed[InputKey.ArrowRight]) {
      deltaX += 1
    }
    if (this.keysPressed[InputKey.ArrowLeft]) {
      deltaX -= 1
    }
    if (this.keysPressed[InputKey.ArrowUp]) {
      deltaY -= 1
    }
    if (this.keysPressed[InputKey.ArrowDown]) {
      deltaY += 1
    }
    if (deltaY || deltaX) {
      this.player.add(Action, { action: new Walk(deltaX, deltaY) })
      this.player['pendingPlayerMove'] = true
    }
  }
  
  private initializeListeners(): void {
    document.addEventListener('keydown', this.keyDownHandler.bind(this), false)
    document.addEventListener('keyup', this.keyUpHandler.bind(this), false)
  }

  private arrowIsPressed(): boolean  {
    return this.keysPressed[InputKey.ArrowRight] || this.keysPressed[InputKey.ArrowLeft] || this.keysPressed[InputKey.ArrowUp] || this.keysPressed[InputKey.ArrowDown]
  }

  private keyDownHandler(e: KeyboardEvent): void {
    //console.log('key down: ' +e.key)
    this.keysPressed[e.key] = true
    this.playerInputTrigger()
  }

  private keyUpHandler(e: KeyboardEvent): void {
    //console.log('key up: ' + e.key)
    delete this.keysPressed[e.key]
  }
}