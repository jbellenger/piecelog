import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

export class View extends React.Component {
  static propTypes = {
    personId: PropTypes.string.isRequired,
    log: PropTypes.array.isRequired,
  };

  render() {
    const { personId, log } = this.props;
    return (
      <div>
        <h1>{personId}</h1>
        <pre>
          {JSON.stringify(log, 2)}
        </pre>
      </div>
    );
  }
}

export const mapStateToProps = (state, {personId}) => {
  const { db } = state;
  return {
    log: db.exec('select * from log where name=?', [personId]),
    person: db.exec('select * from person where name=?', [personId])
  };
};

export default connect(mapStateToProps)(View);
