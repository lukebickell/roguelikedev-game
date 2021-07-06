import { KeyboardInputController } from "../input/keyboard-input.controller"
import { Move } from "../state/component"
import { player } from "../state/ecs"
import { Entity } from "./entity"

export class Player extends Entity {

  constructor(
    private readonly input: KeyboardInputController
  ) {
    super(0, 0, 'red')
    this.name = 'Player'
    this.setSprite('skeleton')
  }

  calculateMovement(): void {
    let deltaX = 0
    let deltaY = 0
    if (this.input.rightPressed) {
      deltaX += this.speed
    }
    if (this.input.leftPressed) {
      deltaX -= this.speed
    }
    if (this.input.upPressed) {
      deltaY -= this.speed
    }
    if (this.input.downPressed) {
      deltaY += this.speed
    }
    if (deltaY || deltaX) {
      player.add(Move, { x: deltaX, y: deltaY })
    }
  }
}