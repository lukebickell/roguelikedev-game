import { Entity } from "geotic"
import { _Action } from ".."

export abstract class Move {
  energyCost: number

  constructor(energyCost = 1) {
    this.energyCost = energyCost
  }

  _getAction(entity: Entity): _Action {
    return this.getAction(entity)
  }

  abstract getScore(): number
  protected abstract getAction(entity: Entity): _Action
}