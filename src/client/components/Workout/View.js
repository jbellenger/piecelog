import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {selector as modelsSelector} from '../../modules/store/models';

export class View extends React.Component {
  static propTypes = {
    workout: PropTypes.object.isRequired,
    events: PropTypes.array.isRequired,
    results: PropTypes.array.isRequired,
  };
  
  render() {
    const {workout, events, results} = this.props;
    console.log(workout.workout_id, 'events', events);
    console.log(workout.workout_id, 'results', results);
    return (
      <div>
        <h1>Workout {workout.workout_id}</h1>
      </div>
    );
  }
}

export const mapStateToProps = (state, {workoutId}) => {
  const models = modelsSelector(state);
  return {
    workout: models.exec('select * from workouts where workout_id=?', [workoutId])[0],
    events: models.exec('select * from events where event_workout_id=? order by event_stamp DESC', [workoutId]),
    results: models.exec('select * from results where result_workout_id=?', [workoutId]),
  };
};

export default connect(mapStateToProps)(View);
