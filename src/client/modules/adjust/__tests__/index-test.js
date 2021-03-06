import { assert } from 'chai';
import * as Adjust from '..';

suite('Adjust', () => {
  suite('weightFactor', () => {
    test('replicates concept2 calculator', () => {
      assert.closeTo(Adjust.weightFactor(100), .802, .001);
      assert.closeTo(Adjust.weightFactor(200), .936, .001);
      assert.closeTo(Adjust.weightFactor(300), 1.024, .001);
    });
  });

  suite('weightAdjustTime', () => {
    test('replicates concept2 calculator', () => {
      assert.closeTo(Adjust.weightAdjustTime(100, 480 /*8:00*/), 385.4 /*6:25.0*/, 1.0);
      assert.closeTo(Adjust.weightAdjustTime(200, 480 /*8:00*/), 449.3 /*7:29.3*/, 1.0);
      assert.closeTo(Adjust.weightAdjustTime(300, 480 /*8:00*/), 491.5 /*8:11.5*/, 1.0);
    });
  });

  suite('weightAdjustDistance', () => {
    test('replicates concept2 calculator', () => {
      assert.closeTo(Adjust.weightAdjustDistance(100, 1000), 1246, 1.0);
      assert.closeTo(Adjust.weightAdjustDistance(200, 1000), 1068, 1.0);
      assert.closeTo(Adjust.weightAdjustDistance(300, 1000), 976, 1.0);
    });
  });

  suite('ageHandicap1k', () => {
    test('returns 0 for missing age', () => {
      assert.equal(0, Adjust.ageHandicap1k());
    });

    test('adjusts 8+', () => {
      assert.equal(10, Adjust.ageHandicap1k(50, Adjust.AGE_K_8PLUS_4X));
      assert.equal(9, Adjust.ageHandicap1k(49, Adjust.AGE_K_8PLUS_4X));
    });
  });
});
