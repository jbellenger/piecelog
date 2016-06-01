import React, {PropTypes} from 'react';
import Table from '../Table';
import * as ResultFields from './fields';
import * as styles from './styles.css';

export default class ResultsTable extends React.Component {
  static propTypes = {
    results: PropTypes.array.isRequired,
    fields: PropTypes.array,
  };

  static defaultProps = {
    fields: [
      ResultFields.PERSON_ID,
      ResultFields.WEIGHT_POUNDS,
      ResultFields.ENTRY_SPLIT,
      ResultFields.ENTRY_WATTS_PER_KG,
      ResultFields.ENTRY_ADJUSTED_SPLIT,
    ],
    sortField: ResultFields.ENTRY_ADJUSTED_SPLIT,
    sortDesc: false
  }

  render() {
    const {results, fields, sortField, sortDesc} = this.props;

    return (
      <Table 
        sortField={sortField}
        sortDesc={sortDesc}
        className={styles.root} 
        rows={results} 
        fields={fields} />
    );
  }
}
