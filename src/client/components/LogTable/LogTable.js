import React from 'react';
import Table from '../Table';
import LogQuery from '../LogQuery';

class LogTable extends React.Component {
  render() {
    return <Table {...this.props} />;
  }
}

export default LogQuery(LogTable);
