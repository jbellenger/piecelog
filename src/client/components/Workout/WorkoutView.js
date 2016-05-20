import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {selector as modelsSelector} from '../../modules/store/models';
import Table from '../Table';
import * as Fields from '../../modules/field/fields';

export class WorkoutView extends React.Component {
  static propTypes = {
    workout: PropTypes.object.isRequired,
    events: PropTypes.array.isRequired,
    results: PropTypes.array.isRequired,
  };
  
  render() {
    const {workout, events, results} = this.props;
    const pieces = workout.pieces;

    return (
      <div>
        <h1>Workout {workout.id}</h1>
        {pieces && (
          <div>
            {JSON.stringify(pieces)}
          </div>
        )}
        <div>
          <h2>Events</h2>
          <Table 
            rows={events} 
            fields={[
              Fields.EVENT_ID,
              Fields.EVENT_STAMP,
            ]}
          />
        </div>
      </div>
    );
  }
}

export const mapStateToProps = (state, {workoutId}) => {
  const models = modelsSelector(state);
  return {
    workout: models.workouts.findById(workoutId),
    events: models.events.filterByWorkoutId(workoutId),
    results: models.results.filterByWorkoutId(workoutId),
  };
};

export default connect(mapStateToProps)(WorkoutView);
