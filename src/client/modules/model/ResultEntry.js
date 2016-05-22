import merge from 'lodash/merge';
import * as Adjust from '../adjust';
import * as stats from '../stats';

export class ResultEntry {
  constructor(data, result) {
    this.result = result;
    merge(this, data);
  }

  get split_seconds() {
    return 500 * (this.time_millis / 1000) / (this.distance_meters);
  }

  get watts() {
    // http://www.concept2.com/indoor-rowers/training/calculators/pace-calculator
    return 2.8 / Math.pow(this.split_seconds/500, 3);
  }

  get watts_per_kg() {
    const kilos = this.result.result_weight_kilos;
    if (kilos) {
      return this.watts/kilos;
    }
  }

  get weight_adjusted_split_seconds() {
    const pounds = this.result.result_weight_pounds;
    if (pounds) {
      return Adjust.weightAdjustTime(pounds, this.result_split_seconds);
    }
  }
}

export class ResultEntryCollection {
  constructor(objs, result, models) {
    this.entries = objs.map((x) => new ResultEntry(x));
    this.result = result;
    this.models = models;
  }

  get mean() {
    return new ResultEntry({
      distance_meters: stats.mean(this.entries.map((x) => x.distance_meters)),
      time_millis: stats.mean(this.entries.map((x) => x.time_millis)),
      models: this.models,
      result: this.result,
    });
  }
}
