import React, {PropTypes} from 'react';
import Table from '../Table';
import * as Fields from '../../modules/field/fields';

export default class ResultsTable extends React.Component {
  static propTypes = {
    results: PropTypes.array.isRequired,
  };

  render() {
    const {results} = this.props;

    const fields = [
      Fields.RESULT_PERSON_ID,
      Fields.RESULT_WEIGHT_POUNDS,
    ];
    if (results.some((x) => x.result_entries.length > 1)) {
      // multi entry result
      fields.push(
        Fields.RESULT_ENTRIES,
      );
    } else {
      fields.push(
        Fields.RESULT_ENTRY,
      );
    }
    return <Table rows={results} fields={fields} />;
  }
}
