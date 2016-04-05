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

  renderTable(rows, colKeys) {
    const cols = colKeys
      .map((key) => Cols._ALL_COLS[key])
      .filter(Boolean);

    return rows && <Table cols={cols} rows={rows}/>;
  }

  render() {
    const {rows, query, error, colKeys} = this.props;

    return (
      <div>
        {this.renderTable(rows, colKeys)}
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

  let query = `select ${colKeys.join(', ')} from log`;
  if (wheres.length) {
    query = `${query} where ${wheres.join(' and ')}`;
  }

  if (sortBy) {
    query = `${query} order by ${sortBy}`;
    if (sortDesc) {
      query = `${query} DESC`;
    }
  }


  const nextProps = {
    ...defaultProps,
    ...props,
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
