import { assert } from 'chai';
import * as geom from '../geom';

suite('geom', () => {
  suite('scale', () => {
    test('simple scales up', () => {
      assert.equal(geom.scale(20, [0, 100], [0, 200]), 40);
    });
    test('simple scales down', () => {
      assert.equal(geom.scale(40, [0, 200], [0, 100]), 20);
    });
    test('offset scales up', () => {
      assert.equal(geom.scale(120, [100, 200], [200, 400]), 240);
    });
    test('offset scales down', () => {
      assert.equal(geom.scale(240, [200, 400], [100, 200]), 120);
    });
    test('inverts', () => {
      assert.equal(geom.scale(120, [100, 200], [200, 400], true), 360);
    })
  });
});
