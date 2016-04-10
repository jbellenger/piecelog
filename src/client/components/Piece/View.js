import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import LogTable from '../LogTable';
import {selector as modelsSelector} from '../../modules/store/models';
import LogEvent from '../../modules/model/LogEvent';

export class View extends React.Component {
  static propTypes = {
    piece: PropTypes.object.isRequired,
  };

  render() {
    const {piece} = this.props;
    return (
      <div>
        <h1>Piece: {piece.piece_id}</h1>
        {this.props.children}
      </div>
    );
  }
}

export const mapStateToProps = (state, {pieceId}) => {
  return {
    piece: modelsSelector(state).exec('select * from piece where piece_id=?', [pieceId])[0],
  };
};

export default connect(mapStateToProps)(View);
