import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {selector as modelsSelector} from '../../modules/store/models';
import * as Format from '../../modules/format';
import * as EventFields from './fields';
import groupBy from 'lodash/groupBy';
import values from 'lodash/values';
import ResultsTable from '../ResultsTable';
import {VictoryChart, VictoryAxis} from 'victory';
import RotatedLabel from '../Graph/RotatedLabel';
import ScatterLine from '../Graph/ScatterLine';
import * as ResultFields from '../ResultsTable/fields';

export class EventView extends React.Component {
  static propTypes = {
    event: PropTypes.object.isRequired,
    results: PropTypes.array.isRequired,
  };

  render() {
    const {event, results} = this.props;
    const personGroups = groupBy(results, 'person_id');
    const personIds = Object.keys(personGroups);
    const resultSets = values(personGroups);

    const PersonTickLabel = RotatedLabel(-25);
    const scatterLines = resultSets.map((data) => (
      ScatterLine({
        domain: false,
        xfield: ResultFields.PERSON_ID,
        yfield: ResultFields.MEAN_SPLIT,
        data
      })
    ));

    return (
      <div>
        <h1>{EventFields.WORKOUT_ID.apply(event)} > {Format.formatStamp(event.stamp)}</h1>
        <div>
          <VictoryChart>
            {scatterLines}
            <VictoryAxis
              tickValues={personIds}
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
