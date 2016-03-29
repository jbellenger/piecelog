import lodash from 'lodash';

export default class LogEvent {
  constructor(json) {
    lodash.merge(this, json);
  }

  get weight_pounds() {
    return this.weight_kilos * 2.2;
  }
}
