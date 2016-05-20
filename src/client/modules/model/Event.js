import merge from 'lodash/merge';

export class Event {
  constructor(data) {
    merge(this, data);
  }
}

export class EventCollection {
  constructor(objs, models) {
    this.models = models;
    this.events = objs.map((x) => new Event(x));
  }

  findById(id) {
    return this.events.find((x) => x.id === id);
  }

  filterByWorkoutId(workoutId) {
    return this.events.filter((x) => x.workout_id === workoutId);
  }
}
