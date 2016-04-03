import React from 'react';
import View from './View';
import LogTable from '../LogTable';

const Route = ({params: {pieceId}}) => (
  <View pieceId={pieceId}>
    <LogTable pieceId={pieceId} />
  </View>
);
export default Route;
