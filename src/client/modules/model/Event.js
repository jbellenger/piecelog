import merge from 'lodash/merge';

export default class Event {
  static fields = [
    'event_id',
    'event_stamp',
    'event_workout_id',
  ];

  constructor(data) {
    merge(this, data);
  }
}
