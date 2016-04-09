import React from 'react';
import View from './View';
import LogTable from '../LogTable';
import PersonSummary from '../PersonSummary';

const Route = ({params: {personId}}) => (
  <View personId={personId}>
    <PersonSummary personId={personId} />
    <LogTable personId={personId} />
  </View>
);
export default Route;
