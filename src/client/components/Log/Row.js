import React, { PropTypes } from 'react';
import { Link } from 'react-router';

export default class Row extends React.Component {
  static propTypes = {
    data: PropTypes.object.isRequired,
    cols: PropTypes.array.isRequired
  }

  cell(key) {
    const value = this.props.data[key];
    switch (key) {
      case 'piece_id':
        return <Link to={'/piece/' + value}>{value}</Link>;
      case 'person_id':
        return <Link to={'/person/' + value}>{value}</Link>
      default:
        return value;
    }
  }

  render() {
    const {cols} = this.props;
    return (
      <tr>
        {cols.map((col) => <td>{this.cell(col)}</td>)}
      </tr>
    );
  }
}
