import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import Row from '../Log/Row';

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
        {log.map((row) => <Row {...row} />)}
      </div>
    );
  }
}

export const mapStateToProps = (state, {personId}) => {
  const { db } = state;
  return {
    log: db.exec('select * from log where person_id=?', [personId]),
    person: db.exec('select * from people where person_id=?', [personId])[0],
  };
};

export default connect(mapStateToProps)(View);
