import React, { PropTypes } from 'react';
import Table from '../Table';
import { connect } from 'react-redux';
import Col from '../Table/Col';
import * as Cols from './Cols';
import Models from '../../modules/model/Models';
import { selector as modelsSelector } from '../../modules/store/models';
import QueryDebug from '../QueryDebug';

class View extends React.Component {
  static propTypes = {
    colKeys: PropTypes.arrayOf(String).isRequired,
    models: PropTypes.instanceOf(Models).isRequired,
    personId: PropTypes.string,
    pieceId: PropTypes.string,
    sortData: PropTypes.object.isRequired
  };

  render() {
    const {colKeys, models, personId, pieceId, sortData} = this.props;

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

    query = `${query} order by ${sortData.col.key}`;
    if (sortData.desc) {
      query = `${query} DESC`;
    }

    let rows, error = null;
    try {
      rows = models.exec(query, params);
    } catch (err) {
      error = err;
    }

    let rowComponents = null;
    if (rows) {
      rowComponents = (
        <div>
          <Table sortData={sortData} cols={cols} rows={rows} />
        </div>
      );
    }

    return (
      <div>
        {rowComponents}
        <QueryDebug query={query} error={error}/>
      </div>
    );
  }
}

export const mapStateToProps = (state, props) => {
  const models = modelsSelector(state);
  return {
    models,
    ...props,
  };
};

export default connect(mapStateToProps)(View);
