import React from 'react';
import LogQuery from '../LogQuery';
import * as LogTableFields from '../../modules/field/LogTableFields';
import GroupingTable from '../GroupingTable';
import LineGraph from '../LineGraph';
import groupBy from 'lodash/groupBy';
import {browserHistory} from 'react-router';

const PieceTypeSummary = ({rows}) => (
  <div>
    <GroupingTable 
      fields={[
        LogTableFields.PIECE, 
        LogTableFields.BEST_SPLIT, 
        LogTableFields.MEDIAN_SPLIT, 
        LogTableFields.COUNT]}
      groupKey={"log_piece_id"}
      rows={rows} 
    />
    <LineGraph 
      width={300}
      height={200}
      series={groupBy(rows, 'log_person_id')} 
      onSeriesClick={(key) => {
        browserHistory.push(`/person/${key}`)
      }}
      onPointClick={(row) => {
        browserHistory.push(`/piece/${row.log_piece_id}`)
      }}
      xfield={LogTableFields.STAMP}
      yfield={LogTableFields.SPLIT}
      labelfield={LogTableFields.SPLIT}
    />
  </div>
);

export default LogQuery(PieceTypeSummary);
