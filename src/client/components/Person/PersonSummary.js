import React from 'react';
import LogQuery from '../LogQuery';
import * as Cols from '../LogTable/Cols';
import GroupingTable from '../GroupingTable';

const PersonSummary = ({rows}) => {
  return <GroupingTable 
    cols={[Cols.PIECE_TYPE, Cols.BEST_SPLIT, Cols.LATEST_SPLIT]}
    groupKey={"piece_type"}
    rows={rows}
  />;
};

export default LogQuery(PersonSummary);
