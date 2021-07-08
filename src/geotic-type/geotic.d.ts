declare module 'geotic' {
  interface Filters {
    all?: typeof Component[], 
    any?: typeof Component[], 
    none?: typeof Component[]
  }

  class World {
    private _id: number
    private _queries: Query[]
    private _entities: Map<string, Entity>
    engine: Engine

    constructor(engine: Engine)

    createId(): string
    getEntity(id: string): Entity
    getEntities(): Entity[]
    createEntity(id?: string): Entity
    destroyEntity(id: string): void
    destroyEntities(): void
    destroy(): void
    createQuery(filters: Filters): Query
    createPrefab(name: string, properties: any): Prefab
    serialize(entities?: Entity[]): { entities: string[] }
    deserialize(data: { entities: string[] }): void
    private _createOrGetEntityById(id: string): Entity
    private _deserializeEntity(data: any): void
    private _candidate(entity: Entity): void
    private _destroyed(id: string): boolean
  }

  class QueryManager {
    private _queries: Query[]
    private _world: World

    constructor(world: World)
  }

  class Query {
    private _cache: Entity[]
    private _onAddListeners: () => void[]
    private _onRemoveListeners: () => void[]
    private _any: BigInt
    private _all: BigInt
    private _none: BigInt

    constructor(world: World, filters: Filters)

    onEntityAdded(fn: () => void): void
    onEntityRemoved(fn: () => void): void
    has(entity: Entity): boolean
    idx(entity: Entity): number

    matches(entity: Entity): boolean
    candidate(entity: Entity): boolean
    refresh(): void
    get(): Entity[]
  }

  class PrefabRegistry {
    private _prefabs: any
    private _engine: Engine

    constructor(engine: Engine)

    deserialize(data: any): Prefab
    register(data: any): void
    get(name: string): Prefab
    create(world: World, name: string, properties: any): Entity
  }

  class PrefabComponent {
    clazz: typeof Component
    properties: any
    overwrite: boolean

    constructor(clazz: typeof Component, properties: any, overwrite: boolean)

    applyToEntity(entity: Entity, initialProps: any): void
  }

  class Prefab {
    name: string
    inherit: any[]
    components: Component[]

    constructor(name: string)

    addComponent(prefabComponent: PrefabComponent): void
    applyToEntity(entity: Entity, prefabProps: any): Entity
  }

  class EntityEvent {
    data: any
    prevented: boolean
    handled: boolean
    name: string
    handlerName: string

    constructor(name: string, data: any)

    is(name: string): boolean
    handle(): void
    prevent(): void
  }

  function attachComponent(entity: Entity, component: Component): void
  function attachComponentKeyed(entity: Entity, component: Component): void
  function attachComponentArray(entity: Entity, component: Component): void
  function removeComponent(entity: Entity, component: Component): void
  function removeComponentKeyed(entity: Entity, component: Component): void
  function removeComponentArray(entity: Entity, component: Component): void
  function serializeComponent(component: Component): { [key: string]: any } // same as properties type on component
  function serializeComponentArray(arr: Component[]): { [key: string]: any }[] // same as properties type on component
  function serializeComponentKeyed(ob: any): any //???

  class Entity {
    private _cbits: BigInt
    private _qeligible: boolean
    private readonly world: World
    readonly id: string
    private readonly components: Component[]
    private isDestroyed: boolean

    constructor(world: World, id: string)

    private _candidacy(): void
    
    add(clazz: typeof Component, properties?: { [key: string]: any }): void
    has(clazz: typeof Component): boolean
    remove(component: Component): void
    destroy(): void
    serialize(): { id: any, [key: string]: Component}
    fireEvent(name: string, data: any): EntityEvent
  }

  class Component {
    private static allowMultiple: boolean
    private static keyProperty: any
    static properties: { [key: string]: any }
    protected entity: Entity

    constructor(properties?: { [key: string]: any })

    get world(): World 
    get allowMultiple(): boolean
    get keyProperty(): any

    destroy(): void
    private _onDestroyed(): void
    private _onEvent(evt: EntityEvent): void
    private _onAttached(entity: Entity): void
    serialize(): { [key: string]: any } 
    onDestroyed(): void
    onEvent(evt: EntityEvent): void
    onAttached(entity: Entity): void
  }

  class ComponentRegistry {
    _cbit: BigInt
    _map: { [key: string]: Component }

    register(clazz: typeof Component): void

    get(key: string): Component
  }

  class Engine {
    _components: ComponentRegistry
    _prefabs: PrefabRegistry

    registerComponent(clazz: typeof Component): void
    registerPrefab(data: any): void
    createWorld(): World
    destroyWorld(world: World): void
  }
}