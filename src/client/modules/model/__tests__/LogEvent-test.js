import { assert } from 'chai';
import LogEvent from '../LogEvent';

suite('LogEvent', () => {
  suite('log_weight_pounds', () => {
    test('converts from log_weight_kilos', () => {
      const row = new LogEvent({log_weight_kilos: 2});
      assert.equal(row.log_weight_pounds, 4.4);
    });
  });

  suite('log_split_seconds', () => {
    test('calculates from log_time_millis and log_distance_meters', () => {
      const row = new LogEvent({log_time_millis: 120000, log_distance_meters: 500});
      assert.equal(row.log_split_seconds, 120);
    });
  });

  suite('log_watts', () => {
    test('calculates from log_split_seconds', () => {
      const row = new LogEvent({log_time_millis: 120000, log_distance_meters: 500});
      assert.closeTo(row.log_watts, 202.546, .01);
    });
  });

  suite('log_watts_per_kg', () => {
    test('calculates from log_watts and log_weight_kilos', () => {
      const row = new LogEvent({log_time_millis: 120000, log_distance_meters: 500, log_weight_kilos: 70});
      assert.closeTo(row.log_watts_per_kg, 2.893, .01);
    });
  });
});
