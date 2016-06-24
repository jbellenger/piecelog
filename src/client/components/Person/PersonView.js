import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import groupBy from 'lodash/groupBy';
import values from 'lodash/values';
import {selector as modelsSelector} from '../../modules/store/models';
import ResultsTable from '../ResultsTable';
import {VictoryChart, VictoryScatter, VictoryAxis, VictoryLine} from 'victory';
import * as ResultFields from '../ResultsTable/fields';
import {ResultEntryFields} from '../ResultsTable/fields';
import RotatedLabel from '../Graph/RotatedLabel';
import ScatterLine from '../Graph/ScatterLine';
import * as Format from '../../modules/format';

export class PersonView extends React.Component {
  static propTypes = {
    person: PropTypes.object.isRequired
  };

  renderWorkoutTrends(results) {
    const resultGroups = groupBy(results, 'workout_id');
    return values(resultGroups).map((data) => (
      ScatterLine({
        xfield: ResultFields.STAMP, 
        yfield: ResultFields.MEAN_SPLIT, 
        data
      })
    ));
  }

  renderWorkouts(results) {
    return results.map((r) => (
      ScatterLine({
        xfield: ResultEntryFields.STAMP, 
        yfield: ResultEntryFields.SPLIT, 
        data: r.entry_collection.entries
      })
    ));
  }

  render() {
    const {person, results} = this.props;

    return (
      <div>
        <h1>{person.id}</h1>
        <div>
          <VictoryChart>
            {this.renderWorkouts(results)}
            {this.renderWorkoutTrends(results)}

            <VictoryAxis
              tickFormat={ResultFields.STAMP.formatter}
              tickLabelComponent={<RotatedLabel />}
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
