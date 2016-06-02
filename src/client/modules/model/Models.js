import {WorkoutCollection} from './Workout';
import {EventCollection} from './Event';
import {ResultCollection} from './Result';
import {Person, PersonCollection} from './Person';

export default class Models {
  install(data) {
    this.workouts = new WorkoutCollection(data.workouts, this);
    this.events = new EventCollection(data.events, this);
    this.results = new ResultCollection(data.results, this);
    this.persons = new PersonCollection(data.person, this);

    return this;
  }
}
