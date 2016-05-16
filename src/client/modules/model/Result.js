import merge from 'lodash/merge';

export default class Result {
  static fields = [
    'result_person_id',
    'result_workout_id',
    'result_event_id',
    'result_stamp',
    'result_weight_kilos',
    'result_racingage',
    'result_entries',
  ];

  constructor(data) {
    merge(this, data);
  }
}
