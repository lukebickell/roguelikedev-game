import { Entity } from 'geotic'
import { KeyboardInputController } from '../input/keyboard-input.controller'
import { EntityCaches } from '../state/cache'
import { Move, Position } from '../state/components'
import world from '../state/ecs'

const movableEntities = world.createQuery({
  all: [Move]
})

export function playerInputMovement(inputController: KeyboardInputController, player: Entity): void {
  let deltaX = 0
  let deltaY = 0
  if (inputController.rightPressed) {
    deltaX += 1
  }
  if (inputController.leftPressed) {
    deltaX -= 1
  }
  if (inputController.upPressed) {
    deltaY -= 1
  }
  if (inputController.downPressed) {
    deltaY += 1
  }
  if (deltaY || deltaX) {
    player.add(Move, { x: deltaX, y: deltaY })
  }
}

export function calculateMoves(grid: { width: number, height: number }): void {
  for (const entity of movableEntities.get()) {
    const position = entity['position'] as Position
    const move = entity['move'] as Move
    let moveIsLegal = true

    let mx = position.x + move.x
    let my = position.y + move.y

    // Legality checks
    // Grid borders
    mx = Math.min(grid.width - 1, mx)
    my = Math.min(grid.height - 1, my)

    // Blocking entities
    const collidingEntities = EntityCaches.getEntitiesAtLocation(mx, my)
    for (const entityId of collidingEntities) {
      if (world.getEntity(entityId)['isBlocking']) {
        moveIsLegal = false
      }
    }

    if (moveIsLegal) {
      position.setCoordinates(mx, my)
    }
    entity.remove(move)
  }
}