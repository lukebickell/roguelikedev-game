import { Entity } from 'geotic'

export function removeComponentSafe(entity: Entity, componentProperty: string): void {
  try {
    entity.remove(entity[componentProperty])
  } catch(error) {
    console.warn(`Attempted to remove nonexistent component ${ componentProperty } from entity ${ entity.id }`)
  }
}