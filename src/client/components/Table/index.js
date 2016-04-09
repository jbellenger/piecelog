import React, {PropTypes} from 'react';
import Row from './Row';
import Col from './Col';
import Headers from './Headers';
import styles from './styles.css';
import * as Shapes from './shapes';

export default class Table extends React.Component {
  static propTypes = {
    rows: Shapes.RowsShape.isRequired,
    cols: Shapes.ColsShape.isRequied,
    sortData: Shapes.SortDataShape,
  };

  render() {
    const {rows, cols, sortData} = this.props;
    
    return (
      <table className={styles.root}>
        <tbody>
          <Headers cols={cols} sortData={sortData}/>
          {rows.map((row, idx) => <Row key={idx} cols={cols} row={row}/>)}
        </tbody>
      </table>
    );
  }
}
