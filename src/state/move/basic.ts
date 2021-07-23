import { Entity } from 'geotic'
import { Move } from '.'
import { aStar } from '../../lib/pathfinding'
import { player } from '../../main'
import { Point } from '../../point'
import { Wait, Walk, _Action } from '../action'
import { IsInFov } from '../components'

export class BasicMove extends Move {
  
  constructor() {
    super(2)
  }

  getScore(): number {
    return 100
  }

  getAction(entity: Entity): _Action {
    if (entity.has(IsInFov)) {
      const target = player
      const path = aStar(Point.fromPosition(entity['position']), Point.fromPosition(target['position']))
      if (path.length) {
        const newLocation = path[1]
        return new Walk(newLocation[0], newLocation[1], false)
      }
    }
    return new Wait()
  }
}