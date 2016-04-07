import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import Col from './Col';
import * as Shapes from './shapes';

const TableHeader = ({key, col, sortData}) => {
  let contents = col.header;
  if (col === sortData.col) {
    contents += sortData.desc ? '↓' : '↑';
  }
  return (
    <th
      onClick={() => sortData.onSort(col)}
      key={key}>
      {contents}
    </th>
  );
};

export default class Headers extends React.Component {
  static propTypes = {
    cols: Shapes.ColsShape.isRequired,
    sortData: Shapes.SortDataShape.isRequired,
  };

  render() {
    const {cols} = this.props;
    return (
      <tr>
        {cols.map((col, i) => <TableHeader key={i} col={col} {...this.props} />)}
      </tr>
    );
  }
}
