import lodash from 'lodash';

export default class Person {
  constructor(data) {
    lodash.merge(this, data);
  }
}
