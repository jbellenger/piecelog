import lodash from 'lodash';

export default class Piece {
  static fields = [
    'piece_description',
    'piece_distance_meters',
    'piece_id',
    'piece_stamp',
    'piece_time_millis',
    'piece_type',
  ];

  constructor(data) {
    lodash.merge(this, data);
  }

  get piece_type() {
    if (this.piece_distance_meters) {
      return `meters-${this.piece_distance_meters}`;
    } else if (this.piece_time_millis) {
      const minutes = Number.parseInt(this.piece_time_millis/(1000 * 60));
      return `minutes-${minutes}`;
    }
  }
}
