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
}
