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
        {cols.map(({key, formatter}, idx) => <td key={idx}>{formatter(data[key])}</td>)}
      </tr>
    );
  }
}
