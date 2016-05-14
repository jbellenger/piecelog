import React from 'react';
import LogQuery from '../LogQuery';
import * as LogTableFields from '../../modules/field/LogTableFields';
import GroupingTable from '../GroupingTable';
import LineGraph from '../LineGraph';
import groupBy from 'lodash/groupBy';
import {browserHistory} from 'react-router';

const PersonSummary = ({rows}) => (
  <div>
    <GroupingTable 
      fields={[
        LogTableFields.PIECE_TYPE, 
        LogTableFields.BEST_SPLIT, 
        LogTableFields.LATEST_SPLIT]}
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
      xTickCount={3}
      yTickCount={5}
      xfield={LogTableFields.STAMP}
      yfield={LogTableFields.SPLIT}
      labelfield={LogTableFields.SPLIT}
    />
  </div>
);

export default LogQuery(PersonSummary);
