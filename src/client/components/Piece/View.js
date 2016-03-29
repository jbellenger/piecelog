import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import LogTable from '../LogTable';
import { selector as modelsSelector } from '../../modules/store/models';

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
  const models = modelsSelector(state);
  return {
    piece: models.exec('select * from pieces where piece_id=?', [pieceId])[0],
    log: models.exec('select * from log where piece_id=?', [pieceId]),
  };
};

export default connect(mapStateToProps)(View);
