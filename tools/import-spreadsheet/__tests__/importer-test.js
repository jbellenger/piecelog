import { assert } from 'chai';
import * as importer from '../importer';

suite('importer', () => {
  suite('parseNumber', () => {
    test('parses valid strings', () => {
      assert.equal(importer.parseNumber('1'), 1);
    });

    test('returns undefined for empty strings', () => {
      assert.isUndefined(importer.parseNumber(''));
      assert.equal(importer.parseNumber('1'), 1);
    });
  });
});
