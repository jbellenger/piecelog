import Database from '../db';
import Person from './Person';
import Piece from './Piece';
import LogEvent from './LogEvent';

export default class Models extends Database {
  install(data) {
    return super.install({
      ...data,
      log: data.log.map((x) => new LogEvent(x)),
      pieces: data.pieces.map((x) => new Piece(x)),
      people: data.people.map((x) => new Person(x))
    });
  }
}
