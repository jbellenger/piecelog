import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {selector as modelsSelector} from '../../modules/store/models';
import * as Format from '../../modules/format';
import * as EventFields from './fields';
import Table from '../Table';
import Result from '../../modules/model/Result';
import ResultsTable from '../ResultsTable';

export class EventView extends React.Component {
  static propTypes = {
    event: PropTypes.object.isRequired,
    results: PropTypes.array.isRequired,
  };

  render() {
    const {event, results} = this.props;
    console.log(event.id, 'results', results);

    return (
      <div>
        <h1>{EventFields.WORKOUT_ID.apply(event)} > {Format.formatStamp(event.stamp)}</h1>
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
