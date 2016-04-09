import { assert } from 'chai';
import * as Stats from '..';

suite('Stats', () => {
  suite('apply', () => {
    test('returns stats for an array', () => {
      const stats = Stats.apply([7, 5, 21]);
      assert.propertyVal(stats, 'mean', 11);
      assert.propertyVal(stats, 'min', 5);
      assert.propertyVal(stats, 'max', 21);
      assert.propertyVal(stats, 'median', 7);
    });
  });

  suite('median', () => {
    test('returns undefined for empty array', () => {
      assert.isUndefined(Stats.median([]));
    });
    test('returns correct value for single-item array', () => {
      assert.equal(Stats.median([42]), 42);
    });
    test('returns correct value for even-count arrays', () => {
      assert.equal(Stats.median([1, 2, 3, 4]), 3);
    });
    test('returns correct value for odd-count arrays', () => {
      assert.equal(Stats.median([2, 3, 4]), 3);
    });
  });
});
