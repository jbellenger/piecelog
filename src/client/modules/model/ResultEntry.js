import merge from 'lodash/merge';
import * as Adjust from '../adjust';

export default class ResultEntry {
  static fields = [
    'distance_meters',
    'time_millis',
    'entry_split_seconds',
  ];

  constructor(data, result) {
    this.result = result;
    merge(this, data);
  }

  get entry_split_seconds() {
    return 500 * (this.time_millis / 1000) / (this.distance_meters);
  }

  get entry_watts() {
    // http://www.concept2.com/indoor-rowers/training/calculators/pace-calculator
    return 2.8 / Math.pow(this.entry_split_seconds/500, 3);
  }

  get entry_watts_per_kg() {
    const kilos = this.result.result_weight_kilos;
    if (kilos) {
      return this.entry_watts/kilos;
    }
  }

  get entry_weight_adjusted_split_seconds() {
    const pounds = this.result.result_weight_pounds;
    if (pounds) {
      return Adjust.weightAdjustTime(pounds, this.result_split_seconds);
    }
  }
}
