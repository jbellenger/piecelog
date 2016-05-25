import React, { PropTypes } from 'react';
import * as Shapes from './shapes';

export default class Row extends React.Component {
  static propTypes = {
    row: Shapes.RowShape.isRequired,
    fields: Shapes.FieldsShape.isRequired,
  };

  render() {
    const {fields, row} = this.props;

    // field extractor protocol:
    //   - if extractor returns an object, then:
    //     - object will be formatted directly by field
    //     - surrounding rows will have normal colspan
    //
    //   - if extractor returns an ??? (array? "MultiRowField"?) then:
    //     - sub items will be individually formatted by field
    //     - surrounding rows will have colspan incremented by size of array

    const objs = fields.map((field, i) => {
      const e = field.extractor(row);
      return {
        field: field,
        index: i,
        formatted: field.formatter(e),
        extracted: e,
        rowspan: 1,
      };
    });

    return (
      <tr>
        {objs.map((obj) => <td rowSpan={obj.rowspan} key={obj.index}>{obj.formatted}</td>)}
      </tr>
    );
  }
}
