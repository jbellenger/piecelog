import merge from 'lodash/merge';
import * as Age from '../age';

export class Person {
  constructor(data) {
    merge(this, data);
  }

  get racingdob() {
    if (this.dob !== undefined) {
      return Age.racing_dob(this.dob);
    }
  }

  get racingage() {
    if (this.dob !== undefined) {
      return Age.racing_age(this.dob);
    }
  }
}

export class PersonCollection {
  constructor(persons, models) {
    this.persons = persons.map((x) => new Person(x));
    this.models = models;
  }

  findById(id) {
    return this.persons.find((x) => x.id === id);
  }
}
