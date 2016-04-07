import { assert } from 'chai';
import * as Stats from '..';

suite.only('Stats', () => {
  suite('apply', () => {
    test('returns stats for an array', () => {
      const stats = Stats.apply([7, 5, 21]);
      assert.propertyVal(stats, 'mean', 11);
      assert.propertyVal(stats, 'min', 5);
      assert.propertyVal(stats, 'max', 21);
      assert.propertyVal(stats, 'median', 7);
    });
  });
});
