import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

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
        <h1>{personId}</h1>
        <h2>Details</h2>
        <pre>{JSON.stringify(person)}</pre>

        <h2>Log</h2>
        <pre>
          {JSON.stringify(log)}
        </pre>
      </div>
    );
  }
}

export const mapStateToProps = (state, {personId}) => {
  const { db } = state;
  return {
    log: db.exec('select * from log where name=?', [personId]),
    person: db.exec('select * from people where name=?', [personId])[0],
  };
};

export default connect(mapStateToProps)(View);
