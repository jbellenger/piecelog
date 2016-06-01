import Database from '../db';
import Piece from './Piece';
import LogEvent from './LogEvent';
import {WorkoutCollection} from './Workout';
import {EventCollection} from './Event';
import {ResultCollection} from './Result';
import {Person, PersonCollection} from './Person';

export default class Models extends Database {
  install(data) {
    this.workouts = new WorkoutCollection(data.workouts, this);
    this.events = new EventCollection(data.events, this);
    this.results = new ResultCollection(data.results, this);
    this.persons = new PersonCollection(data.person, this);

    return super.install({
      ...data,
      log: data.log.map((x) => new LogEvent(x)),
      piece: data.piece.map((x) => new Piece(x)),
    });
  }
}
