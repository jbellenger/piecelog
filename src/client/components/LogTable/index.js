import React, { PropTypes } from 'react';
import Table from '../Table';
import * as Cols from './Cols';

export default class View extends React.Component {
  render() {
    const {rows} = this.props;
    const cols = [
      Cols.PIECE,
      Cols.PERSON,
      Cols.STAMP,
      Cols.SPLIT,
      Cols.DISTANCE,
      Cols.TIME,
      Cols.POUNDS,
      Cols.WATTS,
      Cols.WATTS_PER_KG,
    ];

    return <Table cols={cols} rows={rows}/>;
  }
}
