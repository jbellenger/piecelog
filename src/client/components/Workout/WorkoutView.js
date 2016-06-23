import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {selector as modelsSelector} from '../../modules/store/models';
import groupBy from 'lodash/groupBy';
import uniq from 'lodash/uniq';
import values from 'lodash/values';
import Table from '../Table';
import * as EventFields from '../Event/fields';
import * as Format from '../../modules/format';
import ResultsTable from '../ResultsTable';
import * as ResultFields from '../ResultsTable/fields';
import {VictoryChart, VictoryAxis} from 'victory';
import RotatedLabel from '../Graph/RotatedLabel';
import ScatterLine from '../Graph/ScatterLine';

export class WorkoutView extends React.Component {
  static propTypes = {
    workout: PropTypes.object.isRequired,
    events: PropTypes.array.isRequired,
    results: PropTypes.array.isRequired,
  };

  render() {
    const {workout, events, results} = this.props;
    const pieces = workout.pieces;

    const eventIds = uniq(results.map((r) => r.event_id).filter(Boolean));
    const resultGroups = values(groupBy(results, 'stamp'));
    const scatterLines = resultGroups.map((data) => (
      ScatterLine({
        xfield: ResultFields.STAMP, 
        yfield: ResultFields.MEAN_SPLIT, 
        data
      })
    ));

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
        <div>
          <VictoryChart>
            {scatterLines}
            <VictoryAxis
              tickValues={eventIds}
              tickLabelComponent={<RotatedLabel />}
              tickFormat={Format.formatStamp}
              standalone={false}
            />
            <VictoryAxis
              dependentAxis={true}
              label={ResultFields.ENTRY_SPLIT.header}
              tickFormat={Format.formatSplit}
              standalone={false}
            />
          </VictoryChart>
        </div>
        <ResultsTable 
          fields={[
            ResultFields.PERSON_ID,
            ResultFields.STAMP,
            ResultFields.WEIGHT_POUNDS,
            ResultFields.ENTRY_WATTS_PER_KG,
            ResultFields.ENTRY_SPLIT,
          ]}
          sortField={ResultFields.STAMP}
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
