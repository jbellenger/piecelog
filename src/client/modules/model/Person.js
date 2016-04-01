import lodash from 'lodash';

export default class Person {
  static fields = [
    'piece_id',
    'racingdob',
  ];

  constructor(data) {
    lodash.merge(this, data);
  }
}
