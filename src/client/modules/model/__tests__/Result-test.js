import { assert } from 'chai';
import {Result} from '../Result';

suite('Result', () => {
  suite('result_weight_pounds', () => {
    test('converts from result_weight_kilos', () => {
      const row = new Result({result_weight_kilos: 2});
      assert.equal(row.result_weight_pounds, 4.4);
    });
  });
});
