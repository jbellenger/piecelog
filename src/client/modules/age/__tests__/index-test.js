import { assert } from 'chai';
import * as Age from '../index';

suite('age', () => {
  suite('racing_dob', () => {
    test('rounds down to jan 1, 00:00:00 utc', () => {
      const dob = new Date();
      const rdob = Age.racing_dob(dob);
      assert.equal(rdob.getUTCMonth(), 0);
      assert.equal(rdob.getUTCDate(), 1);
      assert.equal(rdob.getUTCHours(), 0);
      assert.equal(rdob.getUTCMinutes(), 0);
      assert.equal(rdob.getUTCSeconds(), 0);
      assert.equal(rdob.getUTCMilliseconds(), 0);
      assert.equal(rdob.getUTCFullYear(), dob.getUTCFullYear());
    });

    test('accepts numbers', () => {
      const rdob = Age.racing_dob(1459605093138);
      assert.equal(rdob.getTime(), 1451606400000);
    });

    test('accepts dates', () => {
      const rdob = Age.racing_dob(new Date(1459605093138));
      assert.equal(rdob.getTime(), 1451606400000);
    });
  });

  suite('racing_age', () => {
    test('accepts numbers', () => {
      const rage = Age.racing_age(0, 1459605093138);
      assert.equal(rage, 46);
    });

    test('accepts dates', () => {
      const rage = Age.racing_age(new Date(0), new Date(1459605093138));
      assert.equal(rage, 46);
    });
  });
});
