import { Component, EntityEvent } from 'geotic'

export class Defense extends Component {
  max: number
  current: number
  static properties = {
    max: 1,
    current: 1
  }
}

export class Health extends Component {
  max: number
  current: number
  static properties = {
    max: 1,
    current: 1
  }

  onTakeDamage(evt: EntityEvent): void {
    this.current -= evt.data.amount

    evt.handle()
  }
}

export class Power extends Component {
  max: number
  current: number
  static properties = {
    max: 1,
    current: 1
  }
}