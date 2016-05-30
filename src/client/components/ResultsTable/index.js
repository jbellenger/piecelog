import React, {PropTypes} from 'react';
import Table from '../Table';
import * as Fields from '../../modules/field/fields';
import * as styles from './styles.css';

export default class ResultsTable extends React.Component {
  static propTypes = {
    results: PropTypes.array.isRequired,
  };

  render() {
    const {results} = this.props;
    const fields = [
      Fields.RESULT_PERSON_ID,
      Fields.RESULT_WEIGHT_POUNDS,
      Fields.RESULT_ENTRY_SPLIT,
      Fields.RESULT_ENTRY_WATTS_PER_KG,
      Fields.RESULT_ENTRY_ADJUSTED_SPLIT,
    ];

    return (
      <Table 
        sortField={Fields.RESULT_ENTRY_ADJUSTED_SPLIT}
        className={styles.root} 
        rows={results} 
        fields={fields} />
    );
  }
}
