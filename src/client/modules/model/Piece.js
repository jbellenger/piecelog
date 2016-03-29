import lodash from 'lodash';

export default class Piece {
  constructor(data) {
    lodash.merge(this, data);
  }
}
