import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import * as Shapes from './shapes';
import styles from './styles.css';

const TableHeader = ({key, field, sortField, sortDesc, onSort}) => {
  let contents = field.header;
  if (sortField && field === sortField) {
    contents += sortDesc ? '↓' : '↑';
  }
  const attrs = {key};
  if (onSort) {
    attrs.onClick = () => onSort(field);
    attrs.className = styles.hot;
  }

  return (
    <th {...attrs}>
      {contents}
    </th>
  );
};

export default class Headers extends React.Component {
  static propTypes = {
    fields: Shapes.FieldsShape.isRequired,
    sortField: Shapes.FieldShape,
    sortDesc: PropTypes.bool,
    onSort: PropTypes.func,
  };

  render() {
    const {fields} = this.props;
    return (
      <tr>
        {fields.map((field, i) => <TableHeader key={i} field={field} {...this.props} />)}
      </tr>
    );
  }
}
