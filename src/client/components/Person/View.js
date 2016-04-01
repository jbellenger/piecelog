import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import LogTable from '../LogTable';
import LogEvent from '../../modules/model/LogEvent';
import { selector as modelsSelector } from '../../modules/store/models';

export class View extends React.Component {
  static propTypes = {
    personId: PropTypes.string.isRequired,
    log: PropTypes.array.isRequired,
    person: PropTypes.object.isRequired
  };

  render() {
    const { log, person, personId } = this.props;
    return (
      <div>
        <h1>Person: {personId}</h1>
        <h2>Details</h2>
        <pre>{JSON.stringify(person)}</pre>

        <h2>Log</h2>
        <LogTable rows={log} />
      </div>
    );
  }
}

export const mapStateToProps = (state, {personId}) => {
  const models = modelsSelector(state);
  const log = models.exec(`select ${LogEvent.fields.join(',')} from log where log.log_person_id=?`, [personId]);

  return {
    log,
    person: models.exec('select * from person where person_id=?', [personId])[0],
  };
};

export default connect(mapStateToProps)(View);
