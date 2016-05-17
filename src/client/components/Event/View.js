import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {selector as modelsSelector} from '../../modules/store/models';

export class View extends React.Component {
  static propTypes = {
    event: PropTypes.object.isRequired,
    results: PropTypes.array.isRequired,
  };

  render() {
    const {event, results} = this.props;
    console.log(event.event_id, 'results', results);

    return (
      <div>
        <h1>Event {event.event_id}</h1>
        <pre>
          {JSON.stringify(results)}
        </pre>
      </div>
    )
  }
}

export const mapStateToProps = (state, {eventId}) => {
  eventId = Number(eventId);
  const models = modelsSelector(state);

  return {
    event: models.exec('select * from events where event_id=?', [eventId])[0],
    results: models.exec('select * from results where result_event_id=?', [eventId]),
  };
};

export default connect(mapStateToProps)(View);
