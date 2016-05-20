import { assert } from 'chai';
import {Result} from '../Result';

suite('Result', () => {
  suite('_weight_pounds', () => {
    test('converts from weight_kilos', () => {
      const row = new Result({weight_kilos: 2});
      assert.equal(row.weight_pounds, 4.4);
    });
  });
});
