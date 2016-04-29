import { assert } from 'chai';
import {ZoomContainer, zoomTransform} from '../ZoomContainer';

suite('ZoomContainer', () => {
  suite('zoomTransform', () => {
    test('zooms out', () => {
      const transform = zoomTransform({width: 100, height: 200}, .6);
      assert.equal(transform, 'scale(0.6) translate(20, 40)');
    });

    test('zooms in', () => {
      const transform = zoomTransform({width: 100, height: 200}, 1.5);
      assert.equal(transform, 'scale(1.5) translate(-25, -50)');
    });
  });
});
