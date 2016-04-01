import lodash from 'lodash';

export default class Piece {
  static fields = [
    'piece_id',
    'stamp',
    'distance_meters',
    'time_millis',
    'description',
  ];

  constructor(data) {
    lodash.merge(this, data);
  }
}
