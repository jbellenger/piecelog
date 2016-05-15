import Database from '../db';
import Person from './Person';
import Piece from './Piece';
import LogEvent from './LogEvent';
import Workout from './Workout';
import Event from './Event';
import Result from './Result';

export default class Models extends Database {
  install(data) {
    return super.install({
      ...data,
      log: data.log.map((x) => new LogEvent(x)),
      piece: data.piece.map((x) => new Piece(x)),
      person: data.person.map((x) => new Person(x)),
      workouts: data.workouts.map((x) => new Workout(x)),
      events: data.events.map((x) => new Event(x)),
      results: data.results.map((x) => new Result(x)),
    });
  }
}
