import { assert } from 'chai';
import LogEvent from '../LogEvent';

suite('LogEvent', () => {
  suite('weight_pounds', () => {
    test('converts from weight_kilos', () => {
      const row = new LogEvent({weight_kilos: 2});
      assert.equal(row.weight_pounds, 4.4);
    });
  });

  suite('split_seconds', () => {
    test('calculates from time and distance', () => {
      const row = new LogEvent({time_millis: 120000, distance_meters: 500});
      assert.equal(row.split_seconds, 120);
    });
  });

  suite('watts', () => {
    test('calculates from split_seconds', () => {
      const row = new LogEvent({time_millis: 120000, distance_meters: 500});
      assert.closeTo(row.watts, 202.546, .01);
    });
  });

  suite('watts_per_kg', () => {
    test('calculates from watts and weight_kilos', () => {
      const row = new LogEvent({time_millis: 120000, distance_meters: 500, weight_kilos: 70});
      assert.closeTo(row.watts_per_kg, 2.893, .01);
    });
  });
});
