import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import minBy from 'lodash/minBy';
import maxBy from 'lodash/maxBy';
import flatten from 'lodash/flatten';
import groupBy from 'lodash/groupBy';
import toPairs from 'lodash/toPairs';
import {selector as modelsSelector} from '../../modules/store/models';
import ResultsTable from '../ResultsTable';
import * as ResultFields from '../ResultsTable/fields';
import {VictoryChart, VictoryScatter, VictoryAxis, VictoryLine} from 'victory';
import * as Format from '../../modules/format';

export class PersonView extends React.Component {
  static propTypes = {
    person: PropTypes.object.isRequired
  };

  renderMultiPieceLines([workoutId, results]) {
    return results
      .filter((r) => r.entry_collection.entries.length > 1)
      .map((r) => (
        <VictoryLine
          data={r.entry_collection.entries}
          x={() => r.stamp.getTime()}
          y={"split_seconds"}
        />
      ));
  }

  renderScatter([workoutId, results]) {
    return results
      .map((r) => (
        <VictoryScatter
          data={r.entry_collection.entries}
          x={() => r.stamp.getTime()}
          y={"split_seconds"}
        />
      ));
  }

  renderMultiWorkoutLines([workoutId, results]) {
    return (
      <VictoryLine
        data={results}
        x={(r) => r.stamp.getTime()}
        y={(r) => r.entry_collection.mean.split_seconds}
      />
    );
  }

  render() {
    const {person, results} = this.props;

    const stamps = results.map((r) => r.stamp);
    const splits = flatten(results.map((r) => r.entry_collection.entries.map((e) => e.split_seconds)));
    const domain = {
      x: [Math.min(...stamps), Math.max(...stamps)],
      y: [Math.min(...splits), Math.max(...splits)]
    }; 

    const workoutGroups = groupBy(results, 'workout_id');

    return (
      <div>
        <h1>{person.id}</h1>
        <div>
          <VictoryChart domain={domain}>
            {toPairs(workoutGroups).map(this.renderMultiPieceLines)}
            {toPairs(workoutGroups).map(this.renderScatter)}
            {toPairs(workoutGroups).map(this.renderMultiWorkoutLines)}

            <VictoryAxis
              label={ResultFields.STAMP.header}
              tickFormat={ResultFields.STAMP.formatter}
              standalone={false}
            />
            <VictoryAxis
              dependentAxis
              label={ResultFields.ENTRY_SPLIT.header}
              tickFormat={Format.formatSplit}
              standalone={false}
            />
          </VictoryChart>
        </div>
        <ResultsTable 
          results={results} 
          fields={[
            ResultFields.STAMP,
            ResultFields.WORKOUT_ID,
            ResultFields.WEIGHT_POUNDS,
            ResultFields.ENTRY_SPLIT,
          ]}
          sortField={ResultFields.STAMP}
          sortDesc={true}
        />
      </div>
    );
  }
}

export const mapStateToProps = (state, {personId}) => {
  const models = modelsSelector(state);
  const results = models.results.filterByPersonId(personId);
  const person = models.persons.findById(personId);
  return {results, person};
};

export default connect(mapStateToProps)(PersonView);
