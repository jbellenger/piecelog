import React from 'react';
import LogQuery from '../LogQuery';
import * as Cols from '../LogTable/Cols';
import GroupingTable from '../GroupingTable';
import LineGraph from '../LineGraph';
import groupBy from 'lodash/groupBy';
import {browserHistory} from 'react-router';

const PersonSummary = ({rows}) => (
  <div>
    <GroupingTable 
      cols={[Cols.PIECE_TYPE, Cols.BEST_SPLIT, Cols.LATEST_SPLIT]}
      groupKey={"piece_type"}
      rows={rows}
    />
    <LineGraph 
      width={400}
      height={250}
      series={groupBy(rows, 'piece_type')} 
      onSeriesClick={(key) => {
        browserHistory.push(`/piece-type/${key}`)
      }}
      onPointClick={(row) => {
        browserHistory.push(`/piece/${row.log_piece_id}`)
      }}
      xTickCount={2}
      yTickCount={4}
      xcol={Cols.STAMP}
      ycol={Cols.SPLIT}
      labelcol={Cols.SPLIT}
    />
  </div>
);

export default LogQuery(PersonSummary);
