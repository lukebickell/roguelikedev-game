import { Component } from 'geotic'
import { _Action } from '..'
import { Wait } from '../action'
import { Move } from './move.abstract'

export class MoveSet extends Component {
  private moveCharges: Map<Move, number>

  constructor(properties: { moves: (new () => Move)[] }) {
    super()
    this.moveCharges = new Map()
    for (const moveClass of properties.moves) {
      this.moveCharges.set(new moveClass(), 0)
    }
  }

  static properties = {
    moves: [],
  }

  getAction(): _Action {
    this.addEnergyToMoves()

    let bestScore: number = 0
    let bestMove: Move
    for (const move of this.moveCharges.keys()) {
      const score = move.getScore()
      if (score >= bestScore && this.moveCharges.get(move) === 0) {
        bestScore = score
        bestMove = move
      }
    }

    this.resetMoveEnergy(bestMove)
    return bestMove?._getAction(this.entity) || new Wait()
  }

  private addEnergyToMoves(): void {
    for (const move of this.moveCharges.keys()) {
      this.moveCharges.set(move, Math.max(0, this.moveCharges.get(move) - 1))
    }
  }

  private resetMoveEnergy(move: Move): void {
    if (move) {
      this.moveCharges.set(move, move.energyCost)
    }
  }
}