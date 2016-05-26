import React, {PropTypes} from 'react';
import Table from '../Table';
import * as Fields from '../../modules/field/fields';
import * as styles from './styles.css';

/*
 * person    weight     split   watts/kg   adj.split
 * -------------------------------------------------
 * James     160.0      1:55    3.0        1:50
 *                      \---------- MEAN ----------/
 *                    1 1:56    2.9        1.51
 *                    2 1:55    3.1        1.51
 *                    3 1:54    3.1        1.51
 * -------------------------------------------------
 *
 * Field Structure:
 * [person, weight, stats = [split, watts/kg, adj.split]]
 *
 * FieldGroup is like a flatMap operation:
 *  apply an extractor to a row to get a new context object, and then
 *  iteratively apply child elements inside the FieldGroup to the new
 *  context
 *
 * FieldGroup Behavior:
 *  Table: ?
 *  Header flattens field group, always renders all items as a th
 *  Row: ?
 *    if FieldGroup extractor returns an array, create new weak-rows for each item in that array
 *
 */
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
      Fields.RESULT_ENTRY_WATTS,
      Fields.RESULT_ENTRY_WATTS_PER_KG,
    ];

    return <Table className={styles.root} rows={results} fields={fields} />;
  }
}
