import React, {PropTypes} from 'react';
import Row from './Row';

export default class Table extends React.Component {
  static propTypes = {
    rows: PropTypes.array.isRequired,
    cols: PropTypes.array
  };

  render() {
    const cols = this.props.cols || Object.keys(this.props.rows[0]);

    return (
      <table>
        <tbody>
          {this.props.rows.map((row) => <Row cols={cols} data={row}/>)}
        </tbody>
      </table>
    );
  }
}
