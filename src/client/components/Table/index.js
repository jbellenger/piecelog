import React, {PropTypes} from 'react';
import Row from './Row';
import Col from './Col';
import Headers from './Headers';
import styles from './styles.css';

export default class Table extends React.Component {
  static propTypes = {
    rows: PropTypes.arrayOf(PropTypes.object).isRequired,
    cols: PropTypes.arrayOf(PropTypes.instanceOf(Col)),
    sortData: PropTypes.object.isRequired,
  };

  render() {
    const {rows, cols, sortData} = this.props;
    
    return (
      <table className={styles.root}>
        <tbody>
          <Headers cols={cols} sortData={sortData}/>
          {rows.map((row, idx) => <Row key={idx} cols={cols} data={row}/>)}
        </tbody>
      </table>
    );
  }
}
