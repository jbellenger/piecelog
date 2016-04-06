import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import Col from './Col';

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
    cols: PropTypes.arrayOf(PropTypes.instanceOf(Col)).isRequired,
    sortData: PropTypes.shape({
      col: PropTypes.instanceOf(Col).isRequired,
      desc: PropTypes.bool.isRequired,
      onSort: PropTypes.func.isRequired,
    })
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
