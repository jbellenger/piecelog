import React from 'react';
import LogQuery from '../LogQuery';
import * as Cols from '../LogTable/Cols';
import GroupingTable from '../GroupingTable';
import LineGraph from '../LineGraph';
import groupBy from 'lodash/groupBy';

const PersonSummary = ({rows}) => (
  <div>
    <GroupingTable 
      cols={[Cols.PIECE_TYPE, Cols.BEST_SPLIT, Cols.LATEST_SPLIT]}
      groupKey={"piece_type"}
      rows={rows}
    />
    <LineGraph />
  </div>
);

export default LogQuery(PersonSummary);
