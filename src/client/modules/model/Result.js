import merge from 'lodash/merge';

export default class Result {
  static fields = [
    'result_entries',
    'result_event_id',
    'result_person_id',
    'result_racingage',
    'result_stamp',
    'result_weight_kilos',
    'result_weight_pounds',
    'result_workout_id',
  ].join(',');

  constructor(data) {
    merge(this, data);
  }

  get result_weight_pounds() {
    if (this.result_weight_kilos !== undefined) {
      return this.result_weight_kilos * 2.2;
    }
  }
}
