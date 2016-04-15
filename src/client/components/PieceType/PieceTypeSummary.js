import React from 'react';
import LogQuery from '../LogQuery';
import * as Cols from '../LogTable/Cols';
import GroupingTable from '../GroupingTable';

const PieceTypeSummary = ({rows}) => {
  return <GroupingTable 
    cols={[Cols.PIECE, Cols.BEST_SPLIT, Cols.MEDIAN_SPLIT, Cols.COUNT]}
    groupKey={"log_piece_id"}
    rows={rows}
  />;
};

export default LogQuery(PieceTypeSummary);
