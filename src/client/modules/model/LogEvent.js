import lodash from 'lodash';

export default class LogEvent {
  constructor(json) {
    lodash.merge(this, json);
  }

  get weight_pounds() {
    if (this.weight_kilos !== undefined) {
      return this.weight_kilos * 2.2;
    }
  }

  get split_seconds() {
    return 500 * (this.time_millis / 1000) / (this.distance_meters);
  }

  get watts() {
    // http://www.concept2.com/indoor-rowers/training/calculators/pace-calculator
    return 2.8 / Math.pow(this.split_seconds/500, 3);
  }

  get watts_per_kg() {
    if (this.weight_kilos) {
      return this.watts/this.weight_kilos;
    }
  }
}
