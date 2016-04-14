import React from 'react';
import Table from '../Table';
import * as TableShapes from '../Table/shapes';
import Col from '../Table/Col';
import * as Cols from './Cols';
import LogQuery from '../LogQuery';

class LogTable extends React.Component {
  render() {
    return <Table {...this.props} />;
  }
}

export default LogQuery(LogTable);
