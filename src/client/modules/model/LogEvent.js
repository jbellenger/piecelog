import lodash from 'lodash';

export default class LogEvent {
  static fields = [
    'log_person_id',
    'log_piece_id',
    'log_stamp',
    'log_distance_meters',
    'log_time_millis',
    'log_racingage',
    'log_weight_pounds',
    'log_split_seconds',
    'log_watts',
    'log_watts_per_kg',
  ];

  constructor(json) {
    lodash.merge(this, json);
  }

  get log_weight_pounds() {
    if (this.log_weight_kilos !== undefined) {
      return this.log_weight_kilos * 2.2;
    }
  }

  get log_split_seconds() {
    return 500 * (this.log_time_millis / 1000) / (this.log_distance_meters);
  }

  get log_watts() {
    // http://www.concept2.com/indoor-rowers/training/calculators/pace-calculator
    return 2.8 / Math.pow(this.log_split_seconds/500, 3);
  }

  get log_watts_per_kg() {
    if (this.log_weight_kilos) {
      return this.log_watts/this.log_weight_kilos;
    }
  }
}
