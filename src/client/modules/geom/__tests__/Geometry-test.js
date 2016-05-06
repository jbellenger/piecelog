import { assert } from 'chai';
import Geometry from '../Geometry';
import LinearTransform from '../LinearTransform';

suite('Geom', () => {
  const svgSpace = [[0, 300], [0, 200]];
  const dataSpace = [[500, 1000], [100, 120]];
  const geom = new Geometry(svgSpace, dataSpace);

  suite('x', () => {
    test('is a LinearTransform', () => {
      assert.instanceOf(geom.x, LinearTransform);
    });
  });

  suite('y', () => {
    test('is a LinearTransform', () => {
      assert.instanceOf(geom.y, LinearTransform);
    });
  });

  suite('map', () => {
    test('handles edges', () => {
      assert.deepEqual(geom.map([0, 0]), [500, 100]);
      assert.deepEqual(geom.map([300, 200]), [1000, 120]);
    });

    test('handles values inside range', () => {
      assert.deepEqual(geom.map([150, 100]), [750, 110]);
    });

    test('handles values outside range', () => {
      assert.deepEqual(geom.map([-300, -200]), [0, 80]);
    });
  });

  suite('invert', () => {
    test('round trips', () => {
      const values = [150, 100];
      assert.deepEqual(geom.invert().map(geom.map(values)), values);
    });
  });
});
