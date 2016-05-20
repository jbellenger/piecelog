import merge from 'lodash/merge';
import ResultEntry from './ResultEntry';

export class Result {
  constructor(data) {
    merge(this, data);
    this.result_entries = this.result_entries.map((x) => new ResultEntry(x));
  }

  get result_weight_pounds() {
    if (this.result_weight_kilos !== undefined) {
      return this.result_weight_kilos * 2.2;
    }
  }

  collect(fieldName) {
    this.result_entries.map((x) => x[fieldName]);
  }
}

export class ResultCollection {
  constructor(objs, models) {
    this.results = objs.map((x) => new Result(x));
    this.models = models;
  }

  filterByEventId(eventId) {
    return this.results.filter((x) => x.result_event_id === eventId);
  }

  filterByWorkoutId(workoutId) {
    return this.results.filter((x) => x.result_workout_id === workoutId);
  }
}
