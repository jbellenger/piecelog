import {assert} from 'chai';
import {Person} from '../Person';

suite('Person', () => {
  suite('racingdob', () => {
    test('is undefined when dob is undefined', () => {
      assert.isUndefined(new Person({}).racingdob);
    });

    test('is calculated from dob', () => {
      const rdob = new Person({dob: 0}).racingdob;
      assert.equal(rdob.getTime(), 0);
    });
  });

  suite('racingage', () => {
    test('is undefined when dob is undefined', () => {
      assert.isUndefined(new Person({}).racingage);
    });

    test('is defined when dob is defined', () => {
      assert.isDefined(new Person({dob: 0}).racingage);
    });
  });
});
