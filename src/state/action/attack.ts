import { Entity } from 'geotic'
import { Defense, Power, _Action } from '..'
import { Layer300 } from '../components'

export function kill(entity: Entity) {
  entity['appearance'].foregroundSprite = 'i-draining'
  entity.remove(entity['ai'])
  entity.remove(entity['isBlocking'])
  entity.remove(entity['creatureLayer'])
  entity.add(Layer300)
}

export class Attack extends _Action {
  target: Entity

  constructor(target: Entity) {
    super()
    this.target = target
  }

  perform(entity: Entity): void {
    const attackerPower = entity['power'] as Power
    const defenderDefense = this.target?.['defense'] as Defense

    const damage = attackerPower.current - (defenderDefense?.current || 0)
    this.target.fireEvent('take-damage', { amount: damage })
    if (this.target['health']?.current <= 0) {
      kill(this.target)
      console.log(`You kicked a ${this.target['description'].name} for ${damage} damage and killed it!`)
      return
    }
    console.log(`You kicked a ${ this.target['description'].name} for ${damage} damage!`)
  }
}