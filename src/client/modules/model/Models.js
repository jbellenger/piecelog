import Database from '../db';
import Person from './Person';
import Piece from './Piece';
import LogEvent from './LogEvent';
import {WorkoutCollection} from './Workout';
import {EventCollection} from './Event';
import {ResultCollection} from './Result';

export default class Models extends Database {
  install(data) {
    this.workouts = new WorkoutCollection(data.workouts, this);
    this.events = new EventCollection(data.events, this);
    this.results = new ResultCollection(data.results, this);

    return super.install({
      ...data,
      log: data.log.map((x) => new LogEvent(x)),
      piece: data.piece.map((x) => new Piece(x)),
      person: data.person.map((x) => new Person(x)),
    });
  }
}
