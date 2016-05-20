import merge from 'lodash/merge';
import ResultEntry from './ResultEntry';

export class Result {
  constructor(data) {
    merge(this, data);
    if (this.result_entries) {
      this.entries = this.entries.map((x) => new ResultEntry(x));
    }
  }

  get weight_pounds() {
    if (this.weight_kilos !== undefined) {
      return this.weight_kilos * 2.2;
    }
  }

  collect(fieldName) {
    this.entries.map((x) => x[fieldName]);
  }
}

export class ResultCollection {
  constructor(objs, models) {
    this.results = objs.map((x) => new Result(x));
    this.models = models;
  }

  filterByEventId(eventId) {
    return this.results.filter((x) => x.event_id === eventId);
  }

  filterByWorkoutId(workoutId) {
    return this.results.filter((x) => x.workout_id === workoutId);
  }
}
