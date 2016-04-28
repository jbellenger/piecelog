import { assert } from 'chai';
import {ZoomContainer, zoomTransform} from '../ZoomContainer';

suite('ZoomContainer', () => {
  suite('zoomTransform', () => {
    test('zooms out', () => {
      const transform = zoomTransform(.6, 100, 200);
      assert.equal(transform, 'scale(0.6) translate(20, 40)');
    });

    test('zooms in', () => {
      const transform = zoomTransform(1.5, 100, 200);
      assert.equal(transform, 'scale(1.5) translate(-25, -50)');
    });
  });
});
