import { Entity, Query } from "geotic"
import { distance, idToCell } from "./grid"

const octantTransforms = [
  { xx: 1, xy: 0, yx: 0, yy: 1 },
  { xx: 1, xy: 0, yx: 0, yy: -1 },
  { xx: -1, xy: 0, yx: 0, yy: 1 },
  { xx: -1, xy: 0, yx: 0, yy: -1 },
  { xx: 0, xy: 1, yx: 1, yy: 0 },
  { xx: 0, xy: 1, yx: -1, yy: 0 },
  { xx: 0, xy: -1, yx: 1, yy: 0 },
  { xx: 0, xy: -1, yx: -1, yy: 0 },
]

// width: width of map (or visible map?)
// height: height of map (or visible map?)
export default function createFOV(
  opaqueEntities: Query,
  width: number,
  height: number,
  originX: number,
  originY: number,
  radius: number
): { fov: Set<string>, distance: { [key: string]: number } 
} {
  const visible: Set<string> = new Set()

  const blockingLocations: Set<string> = new Set()
  opaqueEntities
    .get()
    .forEach((entity: Entity) => blockingLocations.add(`${entity['position'].x},${entity['position'].y}`))

  const isOpaque = (x: number, y: number) => {
    const locId = `${x},${y}`
    return !!blockingLocations.has(locId)
  }
  const reveal = (x: number, y: number) => {
    return visible.add(`${x},${y}`)
  }

  function castShadows(
    originX: number, 
    originY: number, 
    row: number, 
    start: number, 
    end: number, 
    transform: any, 
    radius: number
  ) {
    let newStart = 0
    if (start < end) return

    let blocked = false

    for (let distance = row; distance < radius && !blocked; distance++) {
      let deltaY = -distance
      for (let deltaX = -distance; deltaX <= 0; deltaX++) {
        let currentX = originX + deltaX * transform.xx + deltaY * transform.xy
        let currentY = originY + deltaX * transform.yx + deltaY * transform.yy

        let leftSlope = (deltaX - 0.5) / (deltaY + 0.5)
        let rightSlope = (deltaX + 0.5) / (deltaY - 0.5)

        if (
          !(
            currentX >= 0 &&
            currentY >= 0 &&
            currentX < width &&
            currentY < height
          ) ||
          start < rightSlope
        ) {
          continue
        } else if (end > leftSlope) {
          break
        }

        if (Math.sqrt(deltaX * deltaX + deltaY * deltaY) <= radius) {
          reveal(currentX, currentY)
        }

        if (blocked) {
          if (isOpaque(currentX, currentY)) {
            newStart = rightSlope
            continue
          } else {
            blocked = false
            start = newStart
          }
        } else {
          if (isOpaque(currentX, currentY) && distance < radius) {
            blocked = true
            castShadows(
              originX,
              originY,
              distance + 1,
              start,
              leftSlope,
              transform,
              radius
            )
            newStart = rightSlope
          }
        }
      }
    }
  }

  reveal(originX, originY)
  for (let octant of octantTransforms) {
    castShadows(originX, originY, 1, 1, 0, octant, radius)
  }

  return {
    fov: visible,
    distance: [...visible].reduce((acc: { [key: string]: number }, val: string) => {
      const cell = idToCell(val)
      acc[val] = distance({ x: originX, y: originY }, { x: cell.x, y: cell.y })
      return acc
    }, {}),
  }
}