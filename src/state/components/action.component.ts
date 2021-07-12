import { Component, Entity } from "geotic"

export abstract class _Action {
  _perform(entity: Entity, componentRef: Component): void {
    this.perform(entity)
    entity.remove(componentRef)
  }

  abstract perform(entity: Entity): void
}

export class Action extends Component {
  action: _Action

  static properties = {
    action: _Action
  }

  perform(): void {
    this.action._perform(this.entity, this)
  }
}
