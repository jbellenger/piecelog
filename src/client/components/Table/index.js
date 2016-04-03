import React, {PropTypes} from 'react';
import Row from './Row';
import Col from './Col';
import Headers from './Headers';
import styles from './styles.css';

export default class Table extends React.Component {
  static propTypes = {
    rows: PropTypes.arrayOf(PropTypes.object).isRequired,
    cols: PropTypes.arrayOf(PropTypes.instanceOf(Col))
  };

  render() {
    const {rows} = this.props;
    const cols = this.props.cols || Col.fromArray(Object.keys(rows[0]));
    
    return (
      <table className={styles.root}>
        <tbody>
          <Headers cols={cols} />
          {rows.map((row, idx) => <Row key={idx} cols={cols} data={row}/>)}
        </tbody>
      </table>
    );
  }
}
