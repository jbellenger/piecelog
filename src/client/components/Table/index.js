import React, {PropTypes} from 'react';
import Row from './Row';
import Col from './Col';
import Headers from './Headers';

export default class Table extends React.Component {
  static propTypes = {
    rows: PropTypes.arrayOf(PropTypes.object).isRequired,
    cols: PropTypes.arrayOf(PropTypes.instanceOf(Col))
  };

  render() {
    const {rows} = this.props;
    const cols = this.props.cols || Col.fromArray(Object.keys(rows[0]));
    
    return (
      <table>
        <tbody>
          <Headers cols={cols} />
          {rows.map((row, idx) => <Row key={idx} cols={cols} data={row}/>)}
        </tbody>
      </table>
    );
  }
}
