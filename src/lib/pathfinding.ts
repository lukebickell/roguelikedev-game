import { Entity } from 'geotic'
import { AStarFinder, DiagonalMovement, Grid } from 'pathfinding'
import { GridDimensions } from '../constants'
import { Point } from '../point'
import { Action, EntityCaches, IsBlocking, Move } from '../state'
import world from '../state/ecs'
import { idToCell } from './grid'

const baseMatrix = []
for (let i = 0; i < GridDimensions.height; i++) {
  baseMatrix.push(new Array(GridDimensions.width).fill(0))
}

export function aStar(start: Point, goal: Point): number[][] {
  const matrix = [...baseMatrix]

  const locIds = EntityCaches.entityLocations.cache.keys()

  // TODO: maintain matrix of 0s and 1s globally to reduce re-calculating it
  for (const locId of locIds) {
    //const locationHasBlocker: boolean = Array.from(EntityCaches.entityLocations.cache.get(locId).values())
    //  .some((entityId: string) => world.getEntity(entityId).has(IsBlocking))
    const cell = idToCell(locId)
    const entitiesAtLocation = EntityCaches.getEntitiesAtLocation(cell.x, cell.y)
    const locationHasBlocker = entitiesAtLocation.some(entity => world.getEntity(entity).has(IsBlocking))
    if (locationHasBlocker) {
      matrix[cell.y][cell.x] = 1
    } else {
      matrix[cell.y][cell.x] = 0
    }
  }

  matrix[start.y][start.x] = 0
  matrix[goal.y][goal.x] = 0
  EntityCaches.lastPFMatrix = matrix

  const grid = new Grid(matrix)
  const finder = new AStarFinder({
    diagonalMovement: DiagonalMovement.IfAtMostOneObstacle,
  })

  const path = finder.findPath(start.x, start.y, goal.x, goal.y, grid)
  EntityCaches.lastPFPath = path

  return path
}

export function moveToTarget(entity: Entity, target: Entity): void {
  const path = aStar(Point.fromPosition(entity['position']), Point.fromPosition(target['position']))
  if (path.length) {
    const newLocation = path[1]
    entity.add(Action, { action: new Move(newLocation[0], newLocation[1], false) })
  }
}