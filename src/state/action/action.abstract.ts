import { Entity, Component } from "geotic"

export abstract class _Action {
  _perform(entity: Entity, componentRef: Component): void {
    this.perform(entity)
    entity.remove(componentRef)
  }

  abstract perform(entity: Entity): void
}