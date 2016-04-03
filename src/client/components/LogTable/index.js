import React, { PropTypes } from 'react';
import Table from '../Table';
import { connect } from 'react-redux';
import * as Cols from './Cols';
import { selector as modelsSelector } from '../../modules/store/models';

class View extends React.Component {
  render() {
    const {rows, query} = this.props;
    return (
      <div>
        <Table cols={Cols._ALL_COLS} rows={rows}/>
        <span>{query}</span>
      </div>
    );
  }
}

export const mapStateToProps = (state, props) => {
  const {personId, pieceId, selectKeys, sortBy} = props;

  const models = modelsSelector(state);
  const keys = selectKeys || Cols._ALL_KEYS;
  const wheres = [];
  const params = [];

  if (personId) {
    wheres.push('log_person_id=?');
    params.push(personId);
  }
  if (pieceId) {
    wheres.push('log_piece_id=?');
    params.push(pieceId);
  }

  let query = `select ${keys.join(', ')} from log`;
  if (wheres.length) {
    query = `${query} where ${wheres.join(' and ')}`;
  }

  if (sortBy) {
    query = `${query} sort by ${sortBy}`;
  }

  try {
    const rows = models.exec(query, params);
    return { ...props, query, rows };
  } catch (error) {
    return { ...props, query, error };
  }
};

export default connect(mapStateToProps)(View);
