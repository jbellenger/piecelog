import { assert } from 'chai';
import LogEvent from '../LogEvent';

suite('LogEvent', () => {
  suite('weight_pounds', () => {
    test('should convert from weight_kilos', () => {
      const row = new LogEvent({weight_kilos: 2});
      assert.equal(row.weight_pounds, 4.4);
    });
  });
});
