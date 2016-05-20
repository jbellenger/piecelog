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

  findByEventId(eventId) {
    return this.events.find((x) => x.event_id === eventId);
  }

  filterByWorkoutId(workoutId) {
    return this.events.filter((x) => x.event_workout_id === workoutId);
  }
}
