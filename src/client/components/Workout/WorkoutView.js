import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {selector as modelsSelector} from '../../modules/store/models';
import Table from '../Table';
import * as EventFields from '../Event/fields';
import ResultsTable from '../ResultsTable';
import * as ResultsFields from '../ResultsTable/fields';

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
              EventFields.ID,
              EventFields.STAMP,
            ]}
          />
        </div>
        <h1>Results</h1>
        <ResultsTable 
          fields={[
            ResultsFields.PERSON_ID,
            ResultsFields.STAMP,
            ResultsFields.WEIGHT_POUNDS,
            ResultsFields.ENTRY_WATTS_PER_KG,
            ResultsFields.ENTRY_SPLIT,
          ]}
          sortField={ResultsFields.STAMP}
          sortDesc={true}
          results={results} 
        />
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
