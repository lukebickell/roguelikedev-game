import { Entity } from "geotic"

export class EntityCache {
  private _cache: Map<string, Set<string>> = new Map()

  get cache(): Map<string, Set<string>> {
    return this._cache
  }

  add(key: string, entity: Entity): void {
    const entityId = entity.id
    if (!this._cache.get(key)) {
      this._cache.set(key, new Set())
    }
    this._cache.get(key).add(entityId)
  }

  deleteEntity(key: string, entity: Entity): void {
    if (this._cache.get(key)?.has(entity.id)) {
      this._cache.get(key).delete(entity.id)
    }
  }

  getEntitiesForKey(key: string): string[] {
    return Array.from(this._cache.get(key)?.values() || [])
  }
}

export class EntityCaches {
  public static entityLocations = new EntityCache()
  public static lastPFMatrix: number[][] = []
  public static lastPFPath: number[][] = []

  public static addEntityToLocationCache(x: number, y: number, entity: Entity): void {
    this.entityLocations.add(this.locId(x, y), entity)
  }

  public static deleteEntityFromLocation(x: number, y: number, entity: Entity): void {
    this.entityLocations.deleteEntity(this.locId(x, y), entity)
  }

  public static getEntitiesAtLocation(x: number, y: number): string[] {
    return this.entityLocations.getEntitiesForKey(this.locId(x, y))
  }

  private static locId(x: number, y: number): string {
    return `${x},${y}`
  }
}