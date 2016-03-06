import React from 'react';
import LogTable from '../../components/LogTable';

export default class LogTableContainer extends React.Component {
  render() {
    const entries = [
      {name: 'Alice', piece: '2k A'},
      {name: 'Alice', piece: '6k A'},
      {name: 'Bob', piece: '2k A'},
      {name: 'Charlie', piece: '2k B'}
    ];

    return <LogTable entries={entries} />;
  }
}

