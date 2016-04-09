import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {selector as modelsSelector} from '../../modules/store/models';
import LogEvent from '../../modules/model/LogEvent';
import groupBy from 'lodash/groupBy';
import orderBy from 'lodash/orderBy';
import * as Cols from '../GroupingTable/Cols';
import GroupingTable from '../GroupingTable';

const mapStateToProps = (state, {personId}) => {
  const rows = modelsSelector(state).exec(`
    select 
      ${LogEvent.fields.join(',')},
      piece.piece_type
    from log 
    join piece on log.log_piece_id=piece.piece_id
    where log.log_person_id=?
  `, [personId]);

  return {rows};
};

const PersonSummary = (props) => (
  <GroupingTable 
    cols={[Cols.PIECE_TYPE, Cols.BEST_SPLIT, Cols.LATEST_SPLIT]}
    groupKey={"piece_type"}
    {...props} 
  />
);

export default connect(mapStateToProps)(PersonSummary);
