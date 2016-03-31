import { assert } from 'chai';
import * as Format from '..';

suite('Format', () => {
  suite('formatSplit', () => {
    test('formats splits > 60sec', () => {
      assert.equal(Format.formatSplit(62.12345), '1:02.12');
    });
    test('formats splits < 60sec', () => {
      assert.equal(Format.formatSplit(52.12345), '0:52.12');
    });
    test('formats splits > 1hr', () => {
      assert.equal(Format.formatSplit(3612), '60:12.00');
    });
    test('rounds down', () => {
      assert.equal(Format.formatSplit(120.444), '2:00.44');
    });
    test('rounds up', () => {
      assert.equal(Format.formatSplit(120.446), '2:00.45');
    });
  });

  suite('formatWattsPerKg', () => {
    test('formats values', () => {
      assert.equal(Format.formatWattsPerKg(3.00001), '3.00');
    });
  });
});
