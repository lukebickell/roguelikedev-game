import { GridDimensions } from "../constants"
import createFOV from "../lib/fov"
import { EntityCaches } from "../state/cache"
import { IsInFov, IsOpaque, IsRevealed, Position } from "../state/components"
import world, { player } from "../state/ecs"

const inFovEntities = world.createQuery({
  all: [IsInFov],
})

const opaqueEntites = world.createQuery({
  all: [IsOpaque],
})

export function fov(): void {
  const playerPosition = player['position'] as Position
  const originX = playerPosition.x
  const originY = playerPosition.y

  const FOV = createFOV(opaqueEntites, GridDimensions.width, GridDimensions.height, originX, originY, 10)

  // Clear stale FOV
  inFovEntities.get().forEach(entity => entity.remove(entity['isInFov'] as IsInFov))

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