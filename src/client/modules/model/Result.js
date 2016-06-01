import merge from 'lodash/merge';
import {ResultEntry, ResultEntryCollection} from './ResultEntry';

export class Result {
  constructor(data) {
    merge(this, data);
    if (this.entries) {
      this.entries = this.entries.map((x) => new ResultEntry(x));
    }
  }

  get entry_collection() {
    return new ResultEntryCollection(this.entries, this, this.models);
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

  filterByPersonId(personId) {
    return this.results.filter((x) => x.person_id === personId);
  }
}
