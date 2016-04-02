import { assert } from 'chai';
import Piece from '../Piece';

suite('Piece', () => {
  suite('piece_type', () => {
    test('calculates time types', () => {
      assert.equal(new Piece({piece_time_millis: 60000}).piece_type, 'minutes-1');
    });

    test('calculates meters types', () => {
      assert.equal(new Piece({piece_distance_meters: 2000}).piece_type, 'meters-2000');
    });

    test('calculates undefined types', () => {
      assert.isUndefined(new Piece().piece_type);
    });
  });
});
