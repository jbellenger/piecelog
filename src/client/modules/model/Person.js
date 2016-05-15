import merge from 'lodash/merge';
import * as Age from '../age';

export default class Person {
  static fields = [
    'person_id',
    'person_dob',
    'person_racingage',
    'person_racingdob',
  ];

  constructor(data) {
    merge(this, data);
  }

  get person_racingdob() {
    if (this.person_dob !== undefined) {
      return Age.racing_dob(this.person_dob);
    }
  }

  get person_racingage() {
    if (this.person_dob !== undefined) {
      return Age.racing_age(this.person_dob);
    }
  }
}
