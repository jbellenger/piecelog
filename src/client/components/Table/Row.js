import React, { PropTypes } from 'react';
import Col from './Col';

export const DEFAULT_FORMATTER = (x) => x;
export default class Row extends React.Component {
  static propTypes = {
    data: PropTypes.object.isRequired,
    cols: PropTypes.arrayOf(PropTypes.instanceOf(Col)).isRequired
  }

  render() {
    const {cols, data} = this.props;

    return (
      <tr>
        {cols.map((col,i) => <td key={i}>{col.apply(data)}</td>)}
      </tr>
    );
  }
}
