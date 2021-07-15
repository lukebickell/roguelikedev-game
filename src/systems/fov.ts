import { GridDimensions } from "../constants"
import createFOV from "../lib/fov"
import { EntityCaches } from "../state/cache"
import { IsInFov, IsOpaque, IsRevealed, Position } from "../state/components"
import world from "../state/ecs"

const inFovEntities = world.createQuery({
  all: [IsInFov],
})

const opaqueEntites = world.createQuery({
  all: [IsOpaque],
})

export function fov(origin: Position): void {
  const originX = origin.x
  const originY = origin.y

  const FOV = createFOV(opaqueEntites, GridDimensions.width, GridDimensions.height, originX, originY, 10)

  // Clear stale FOV
  const inFovClone = [...inFovEntities.get()]
  for (const entity of inFovClone) {
    entity.remove(entity['isInFov'] as IsInFov)
  }

  for (const locationId of FOV.fov) {
    const entitiesAtLocation = EntityCaches.entityLocations.getEntitiesForKey(locationId)

    for (const entityId of entitiesAtLocation) {
      const entity = world.getEntity(entityId)
      entity.add(IsInFov)

      if (!entity.has(IsRevealed)) {
        entity.add(IsRevealed)
      }
    }
  }
}
