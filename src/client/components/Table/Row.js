import React, { PropTypes } from 'react';
import Col from './Col';
import * as Shapes from './shapes';

export const DEFAULT_FORMATTER = (x) => x;
export default class Row extends React.Component {
  static propTypes = {
    row: Shapes.RowShape.isRequired,
    cols: Shapes.ColsShape.isRequired,
  }

  render() {
    const {cols, row} = this.props;

    return (
      <tr>
        {cols.map((col,i) => <td key={i}>{col.apply(row)}</td>)}
      </tr>
    );
  }
}
