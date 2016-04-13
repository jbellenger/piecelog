import React, { PropTypes } from 'react';
import Table from '../Table';
import * as TableShapes from '../Table/shapes';
import { connect } from 'react-redux';
import Col from '../Table/Col';
import * as Cols from './Cols';
import Models from '../../modules/model/Models';
import LogEvent from '../../modules/model/LogEvent';
import Piece from '../../modules/model/Piece';
import { selector as modelsSelector } from '../../modules/store/models';
import QueryDebug from '../QueryDebug';

class View extends React.Component {
  static propTypes = {
    cols: TableShapes.ColsShape.isRequired,
    models: PropTypes.instanceOf(Models).isRequired,
    personId: PropTypes.string,
    pieceId: PropTypes.string,
    pieceType: PropTypes.string,
    sortData: PropTypes.object.isRequired
  };

  render() {
    const {cols, models, personId, pieceId, pieceType, sortData} = this.props;

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

    const fields = LogEvent.fields.concat(Piece.fields);
    let query = `
      select ${fields.join(',')} from log
      join piece on log.log_piece_id=piece.piece_id
    `;
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
