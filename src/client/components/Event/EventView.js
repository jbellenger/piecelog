import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {selector as modelsSelector} from '../../modules/store/models';
import * as Format from '../../modules/format';
import * as EventFields from './fields';
import groupBy from 'lodash/groupBy';
import toPairs from 'lodash/toPairs';
import Table from '../Table';
import Result from '../../modules/model/Result';
import ResultsTable from '../ResultsTable';
import {VictoryChart, VictoryScatter, VictoryAxis, VictoryLine, VictoryLabel} from 'victory';
import * as ResultFields from '../ResultsTable/fields';
import Tick from 'victory-chart/lib/components/victory-axis/tick';

export const RotatedLabel = (angle) =>  (props) => (
  <VictoryLabel {...props} angle={angle} textAnchor={"end"} />
);

export class EventView extends React.Component {
  static propTypes = {
    event: PropTypes.object.isRequired,
    results: PropTypes.array.isRequired,
  };

  renderPersonScatter([personId, results]) {
    return results
      .map((r) => (
        <VictoryScatter
          data={r.entry_collection.entries}
          x={() => personId}
          y={'split_seconds'} />
      ));
  }

  renderPersonLine([personId, results]) {
    return results
      .map((r) => (
        <VictoryLine
          data={r.entry_collection.entries}
          x={() => personId}
          y={'split_seconds'}
        />
      ));
  }

  render() {
    const {event, results} = this.props;
    const personGroups = groupBy(results, 'person_id');
    const personPairs = toPairs(personGroups);
    const PersonTickLabel = RotatedLabel(-25);

    return (
      <div>
        <h1>{EventFields.WORKOUT_ID.apply(event)} > {Format.formatStamp(event.stamp)}</h1>
        <div>
          <VictoryChart>
            {personPairs.map(this.renderPersonScatter)}
            {personPairs.map(this.renderPersonLine)}
            <VictoryAxis
              tickValues={Object.keys(personGroups)}
              tickLabelComponent={<PersonTickLabel />}
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
        <ResultsTable results={results} />
      </div>
    )
  }
}

export const mapStateToProps = (state, {eventId}) => {
  eventId = Number(eventId);
  const models = modelsSelector(state);

  return {
    event: models.events.findById(eventId),
    results: models.results.filterByEventId(eventId),
  };
};

export default connect(mapStateToProps)(EventView);
