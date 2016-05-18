import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {selector as modelsSelector} from '../../modules/store/models';
import * as Format from '../../modules/format';
import * as Fields from '../../modules/field/fields';
import Table from '../Table';
import Result from '../../modules/model/Result';

export class EventView extends React.Component {
  static propTypes = {
    event: PropTypes.object.isRequired,
    results: PropTypes.array.isRequired,
  };

  render() {
    const {event, results} = this.props;
    console.log(event.event_id, 'results', results);

    return (
      <div>
        <h1>{Fields.EVENT_WORKOUT_ID.apply(event)} > {Format.formatStamp(event.event_stamp)}</h1>
        <Table
          rows={results}
          fields={[
            Fields.RESULT_PERSON_ID,
            Fields.RESULT_WEIGHT_POUNDS,
          ]}
        />
      </div>
    )
  }
}

export const mapStateToProps = (state, {eventId}) => {
  eventId = Number(eventId);
  const models = modelsSelector(state);

  return {
    event: models.exec('select * from events where event_id=?', [eventId])[0],
    results: models.exec(`select ${Result.fields} from results where result_event_id=?`, [eventId]),
  };
};

export default connect(mapStateToProps)(EventView);
