import React from 'react';
import LogQuery from '../LogQuery';
import * as Cols from '../LogTable/Cols';
import GroupingTable from '../GroupingTable';
import LineGraph from '../LineGraph';
import groupBy from 'lodash/groupBy';
import {browserHistory} from 'react-router';

const PieceTypeSummary = ({rows}) => (
  <div>
    <GroupingTable 
      cols={[Cols.PIECE, Cols.BEST_SPLIT, Cols.MEDIAN_SPLIT, Cols.COUNT]}
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
      xcol={Cols.STAMP}
      ycol={Cols.SPLIT}
      labelcol={Cols.SPLIT}
    />
  </div>
);

export default LogQuery(PieceTypeSummary);
