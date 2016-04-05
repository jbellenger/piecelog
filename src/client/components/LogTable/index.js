import React, { PropTypes } from 'react';
import Table from '../Table';
import { connect } from 'react-redux';
import Col from '../Table/Col';
import * as Cols from './Cols';
import { selector as modelsSelector } from '../../modules/store/models';
import QueryDebug from '../QueryDebug';

class View extends React.Component {
  static propTypes = {
    cols: PropTypes.arrayOf(PropTypes.instanceOf(Col)).isRequired,
    rows: PropTypes.arrayOf(PropTypes.object),
    error: PropTypes.instanceOf(Error),
    sortData: PropTypes.object,
    query: PropTypes.string.isRequired
  };

  onSort(col) {
    console.log('TODO: LogTable onSort', col);
  }

  render() {
    const {cols, rows, query, error, sortData} = this.props;

    let table = null;
    if (rows) {
      const _sortData = {
        ...sortData,
        onSort: this.onSort
      };

      table = <Table sortData={_sortData} cols={cols} rows={rows} />;
    }

    return (
      <div>
        {table}
        <QueryDebug query={query} error={error}/>
      </div>
    );
  }
}

const defaultProps = {
  colKeys: Cols._ALL_KEYS,
  sortBy: 'log_stamp',
  sortDesc: true,
};

export const mapStateToProps = (state, props) => {
  const {personId, pieceId, colKeys, sortBy, sortDesc} = {...defaultProps, ...props};

  const models = modelsSelector(state);
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

  const cols = colKeys
    .map((key) => Cols._ALL_COLS[key])
    .filter(Boolean);

  let query = `select ${cols.map((c) => c.key).join(', ')} from log`;
  if (wheres.length) {
    query = `${query} where ${wheres.join(' and ')}`;
  }

  const sortData = {};
  if (sortBy) {
    query = `${query} order by ${sortBy}`;
    if (sortDesc) {
      query = `${query} DESC`;
    }

    sortData.sortBy = cols.find((c) => c.key === sortBy);
    sortData.sortDesc = !!sortDesc;
  }

  const nextProps = {
    ...defaultProps,
    ...props,
    cols,
    sortData,
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
