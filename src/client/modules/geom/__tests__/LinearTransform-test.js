import { assert } from 'chai';
import LinearTransform from '../LinearTransform';

suite('LinearTransform', () => {
  suite('map', () => {
    test('simple scales up', () => {
      const lt = new LinearTransform([0, 100], [0, 200]);
      assert.equal(lt.map(20), 40);
    });

    test('simple scales down', () => {
      const lt = new LinearTransform([0, 200], [0, 100]);
      assert.equal(lt.map(40), 20);
    });

    test('offset scales up', () => {
      const lt = new LinearTransform([100, 200], [200, 400]);
      assert.equal(lt.map(120), 240);
    });

    test('offset scales down', () => {
      const lt = new LinearTransform([200, 400], [100, 200]);
      assert.equal(lt.map(240), 120);
    });
  });

  suite('value', () => {
    test('works for positive ranges', () => {
      const lt = new LinearTransform([0, 50], [0, 200]);
      assert.equal(lt.value(.5), 25);
    });

    test('works for negative ranges', () => {
      const lt = new LinearTransform([100, 50], [0, 200]);
      assert.equal(lt.value(.5), 75);
    });
  });

  suite('invert', () => {
    test('round trips values', () => {
      const lt = new LinearTransform([-10, -20], [100, 101]);
      const lt2 = lt.invert();

      for (let i=-1000; i < 1000; ++i) {
        assert.equal(i, lt.map(lt2.map(i)));
      }
    });
  })
});
