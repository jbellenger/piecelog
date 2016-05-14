import React, {PropTypes} from 'react';
import Row from './Row';
import Headers from './Headers';
import styles from './styles.css';
import * as Shapes from './shapes';

export default class Table extends React.Component {
  static propTypes = {
    rows: Shapes.RowsShape.isRequired,
    fields: Shapes.FieldsShape.isRequied,
    sortData: Shapes.SortDataShape,
  };

  render() {
    const {rows, fields, sortData} = this.props;
    
    return (
      <table className={styles.root}>
        <tbody>
          <Headers fields={fields} sortData={sortData}/>
          {rows.map((row, idx) => <Row key={idx} fields={fields} row={row}/>)}
        </tbody>
      </table>
    );
  }
}
