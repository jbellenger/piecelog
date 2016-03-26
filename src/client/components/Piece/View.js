import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import LogTable from '../LogTable';

export class View extends React.Component {
  static propTypes = {
    pieceId: PropTypes.string.isRequired,
    piece: PropTypes.object.isRequired,
    log: PropTypes.array.isRequired,
  };

  render() {
    const { pieceId, piece, log } = this.props;
    return (
      <div>
        <h1>Piece: {pieceId}</h1>
        <h2>Details</h2>
        <pre>{JSON.stringify(piece)}</pre>

        <h2>Log</h2>
        <LogTable rows={log} />
      </div>
    );
  }
}

export const mapStateToProps = (state, {pieceId}) => {
  const { db } = state;
  return {
    piece: db.exec('select * from pieces where piece_id=?', [pieceId])[0],
    log: db.exec('select * from log where piece_id=?', [pieceId]),
  };
};

export default connect(mapStateToProps)(View);
