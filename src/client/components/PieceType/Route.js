import React from 'react';
import LogTable from '../LogTable';

const Route = ({params: {pieceType}}) => (
  <LogTable pieceType={pieceType} />
);
export default Route;
