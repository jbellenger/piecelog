import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import Col from './Col';

export default class Headers extends React.Component {
  static propTypes = {
    cols: PropTypes.arrayOf(PropTypes.instanceOf(Col)).isRequired
  };

  render() {
    const {cols} = this.props;
    return (
      <tr>
        {cols.map((col) => <th key={col.key}>{col.header}</th>)}
      </tr>
    );
  }
}
