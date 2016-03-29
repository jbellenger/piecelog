import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import LogTable from '../LogTable';
import { _ALL_KEYS as LOGTABLE_KEYS } from '../LogTable/Cols';
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

  return {
    log: models.exec(`select ${LOGTABLE_KEYS.join(',')} from log where person_id=?`, [personId]),
    person: models.exec('select * from people where person_id=?', [personId])[0],
  };
};

export default connect(mapStateToProps)(View);
