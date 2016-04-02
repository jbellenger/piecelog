import React, { PropTypes } from 'react';
import Table from '../Table';
import * as Cols from './Cols';

export default class View extends React.Component {
  render() {
    const {rows} = this.props;
    return <Table cols={Cols._ALL_COLS} rows={rows}/>;
  }
}
