import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import minBy from 'lodash/minBy';
import maxBy from 'lodash/maxBy';
import {selector as modelsSelector} from '../../modules/store/models';
import ResultsTable from '../ResultsTable';
import * as ResultFields from '../ResultsTable/fields';
import {VictoryChart, VictoryScatter, VictoryAxis, VictoryLine} from 'victory';
import * as Format from '../../modules/format';

export class PersonView extends React.Component {
  static propTypes = {
    person: PropTypes.object.isRequired
  };

  render() {
    const {person, results} = this.props;
    const stamps = results.map((r) => r.stamp);
    const domain = {x: [Math.min(...stamps), Math.max(...stamps)]}; 
    return (
      <div>
        <h1>{person.id}</h1>
        <div>
          <VictoryChart domain={domain}>
            {results.map((r) => (
              <VictoryScatter
                data={r.entry_collection.entries}
                x={() => r.stamp.getTime()}
                y={"split_seconds"}
              />
            ))}
            {results
              .filter((r) => r.entry_collection.entries.length > 1)
              .map((r) => (
                <VictoryLine
                  data={r.entry_collection.entries}
                  x={() => r.stamp.getTime()}
                  y={"split_seconds"}
                />
            ))}

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
