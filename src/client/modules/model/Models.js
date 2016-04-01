import Database from '../db';
import Person from './Person';
import Piece from './Piece';
import LogEvent from './LogEvent';

export default class Models extends Database {
  install(data) {
    return super.install({
      ...data,
      log: data.log.map((x) => new LogEvent(x)),
      piece: data.piece.map((x) => new Piece(x)),
      person: data.person.map((x) => new Person(x))
    });
  }
}
