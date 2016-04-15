import React from 'react';
import LogTable from '../LogTable';
import PieceTypeSummary from './PieceTypeSummary';

export default ({params}) => (
  <div>
    <PieceTypeSummary {...params}/>
    <LogTable {...params}/>
  </div>
);
