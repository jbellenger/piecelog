import merge from 'lodash/merge';

export default class Workout {
  static fields = [
    'workout_id',
    'workout_pieces',
  ];

  constructor(data) {
    merge(this, data);
  }
}
