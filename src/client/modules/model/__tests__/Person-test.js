import { assert } from 'chai';
import Person from '../Person';

suite('Person', () => {
  suite('person_racingdob', () => {
    test('is undefined when person_dob is undefined', () => {
      assert.isUndefined(new Person({}).person_racingdob);
    });

    test('is calculated from person_dob', () => {
      const rdob = new Person({person_dob: 0}).person_racingdob;
      assert.equal(rdob.getTime(), 0);
    });
  });

  suite('person_racingage', () => {
    test('is undefined when person_dob is undefined', () => {
      assert.isUndefined(new Person({}).person_racingage);
    });

    test('is defined when person_dob is defined', () => {
      assert.isDefined(new Person({person_dob: 0}).person_racingage);
    });
  });
});
