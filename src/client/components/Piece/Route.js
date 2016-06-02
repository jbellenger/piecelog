import React from 'react';
import View from './View';
import LogTable from '../LogTable';
import Graph from './Graph';

const Route = ({params: {pieceId}}) => (
  <View pieceId={pieceId}>
    <Graph />
    <LogTable pieceId={pieceId} />
  </View>
);
export default Route;
