import React, { PropTypes } from 'react';
import Table from '../Table';
import { connect } from 'react-redux';
import * as Cols from './Cols';
import { selector as modelsSelector } from '../../modules/store/models';
import QueryDebug from '../QueryDebug';

class View extends React.Component {
  static propTypes = {
    colKeys: PropTypes.arrayOf(PropTypes.string).isRequired,
    rows: PropTypes.arrayOf(PropTypes.object),
    error: PropTypes.instanceOf(Error),
    query: PropTypes.string.isRequired
  };

  render() {
    const {rows, query, error, colKeys} = this.props;
    const cols = colKeys
      .map((key) => Cols._ALL_COLS[key])
      .filter(Boolean);

    const tableComponent = rows && <Table cols={cols} rows={rows}/>;
    return (
      <div>
        {tableComponent}
        <QueryDebug query={query} error={error}/>
      </div>
    );
  }
}

export const mapStateToProps = (state, props) => {
  const {personId, pieceId, colKeys, sortBy} = props;

  const models = modelsSelector(state);
  const keys = colKeys || Cols._ALL_KEYS;
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

  const nextProps = {
    ...props,
    colKeys: keys,
    query
  };

  try {
    return {
      ...nextProps,
      rows: models.exec(query, params)
    };
  } catch (error) {
    return {
      ...nextProps,
      error
    };
  }
};

export default connect(mapStateToProps)(View);
