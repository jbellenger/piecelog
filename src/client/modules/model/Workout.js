import merge from 'lodash/merge';

export class Workout {
  constructor(data) {
    merge(this, data);
  }
}

export class WorkoutCollection {
  constructor(objs, models) {
    this.workouts = objs.map((x) => new Workout(x));
    this.models = models;
  }

  findById(id) {
    return this.workouts.find((x) => x.id === id);
  }
}
