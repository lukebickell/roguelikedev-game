//tsignore
import { Engine, Component } from 'geotic';

// define some simple components
class Position extends Component {
  static properties = {
      x: 0,
      y: 0,
  }
}

class Velocity extends Component {
    static properties = {
        x: 0,
        y: 0,
    };
}

class IsFrozen extends Component {}

const engine = new Engine();

// all Components and Prefabs must be `registered` by the engine
engine.registerComponent(Position);
engine.registerComponent(Velocity);
engine.registerComponent(IsFrozen);

// create a world to hold and create entities and queries
const world = engine.createWorld();

// Create an empty entity. Call `entity.id` to get the unique ID.
const entity = world.createEntity();
const entityId = entity.id

// add some components to the entity
entity.add(Position, { x: 4, y: 10 });
entity.add(Velocity, { x: 1, y: .25 });

// create a query that tracks all components that have both a `Position`
// and `Velocity` component but not a `IsFrozen` component. A query can
// have any combination of `all`, `none` and `any`
const kinematics = world.createQuery({
    all: [Position, Velocity],
    none: [IsFrozen]
});


// geotic does not dictate how your game loop should behave
const loop = (dt) => {
    // loop over the result set to update the position for all entities
    // in the query. The query will always return an up-to-date array
    // containing entities that match
    kinematics.get().forEach((entity) => {
        entity['position'].x += entity['velocity'].x * dt;
        entity['position'].y += entity['velocity'].y * dt;
    });
};

// serialize all world entities into a JS object
const data = world.serialize();

// convert the serialized data back into entities and components
world.deserialize(data);