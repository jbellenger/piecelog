import React from 'react';
import View from './View';
import LogTable from '../LogTable';

const Route = (props) => (
  <View personId={props.params.personId}>
    <LogTable personId={props.params.personId} />
  </View>
);
export default Route;
