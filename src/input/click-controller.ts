import { Canvas } from '../map/canvas/canvas'
import { EntityCaches } from '../state'
import world from '../state/ecs'

export class ClickController {

  constructor() {
    this.initializeCanvasListener()
  }

  private initializeCanvasListener(): void {
    Canvas.canvas.addEventListener('click', this.handleClick.bind(this))
  }

  private handleClick(event: MouseEvent): void {
    const [x, y] = Canvas.pxToCell(event.clientX, event.clientY)
    const entitiesAtClick = EntityCaches.getEntitiesAtLocation(x, y)

    for (const entityId of entitiesAtClick) {
      const entity = world.getEntity(entityId)

      console.log(
        `${entity['appearance'].sprite} ${entity['description'].name}`,
        entity.serialize()
      );
    }
  }
}