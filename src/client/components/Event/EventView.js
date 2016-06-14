import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {selector as modelsSelector} from '../../modules/store/models';
import * as Format from '../../modules/format';
import * as EventFields from './fields';
import groupBy from 'lodash/groupBy';
import Table from '../Table';
import Result from '../../modules/model/Result';
import ResultsTable from '../ResultsTable';
import {VictoryChart, VictoryScatter, VictoryAxis, VictoryLine} from 'victory';
import * as ResultFields from '../ResultsTable/fields';

export class EventView extends React.Component {
  static propTypes = {
    event: PropTypes.object.isRequired,
    results: PropTypes.array.isRequired,
  };

  render() {
    const {event, results} = this.props;
    return (
      <div>
        <h1>{EventFields.WORKOUT_ID.apply(event)} > {Format.formatStamp(event.stamp)}</h1>
        <div>
          <VictoryChart>
            <VictoryAxis
              label={ResultFields.STAMP.header}
              tickFormat={ResultFields.STAMP.formatter}
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
