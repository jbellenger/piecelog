import React from 'react';
import LogQuery from '../LogQuery';
import * as Cols from '../LogTable/Cols';
import GroupingTable from '../GroupingTable';

const PersonSummary = ({rows}) => {
  return <GroupingTable 
    cols={[Cols.PIECE_TYPE, Cols.BEST_SPLIT, Cols.LATEST_SPLIT, Cols.SPLIT_SPARKLINE]}
    groupKey={"piece_type"}
    rows={rows}
  />;
};

export default LogQuery(PersonSummary);
