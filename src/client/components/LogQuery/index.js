import React, {PropTypes} from 'react';
import {selector as modelsSelector} from '../../modules/store/models';
import {connect} from 'react-redux';
import LogEvent from '../../modules/model/LogEvent';
import Piece from '../../modules/model/Piece';

const LogQuery = (Inner) => class LogQuery extends React.Component {
  render() {
    return (
      <Inner {...this.props} />
    );
  }
};

const mapStateToProps = (state, props) => {
  const {personId, pieceId, pieceType, sortData} = props;

  const wheres = [];
  const params = [];
  if (personId) {
    wheres.push('log.log_person_id=?');
    params.push(personId);
  }
  if (pieceId) {
    wheres.push('log.log_piece_id=?');
    params.push(pieceId);
  }
  if (pieceType) {
    wheres.push('piece.piece_type=?');
    params.push(pieceType);
  }

  const prefix = (arr, pre) => arr.map((x) => `${pre}.${x}`);

  const fields = [
    ...prefix(LogEvent.fields, 'log'),
    ...prefix(Piece.fields, 'piece'),
  ];

  let query = `
    select ${fields.join(',')} from log
    join piece on log.log_piece_id=piece.piece_id
  `;
  if (wheres.length) {
    query = `${query} where ${wheres.join(' and ')}`;
  }

  if (sortData) {
    query = `${query} order by ${sortData.field.key}`;
    if (sortData.desc) {
      query = `${query} DESC`;
    }
  }
  
  const rows = modelsSelector(state).exec(query, params);

  return {rows, query};
};

export default (Inner) => connect(mapStateToProps)(LogQuery(Inner));
