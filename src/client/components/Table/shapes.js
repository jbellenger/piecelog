import {PropTypes} from 'react';
import Field from '../../modules/field';

export const RowShape = PropTypes.any;

export const RowsShape = PropTypes.arrayOf(RowShape);

export const FieldShape = PropTypes.instanceOf(Field);

export const FieldsShape = PropTypes.arrayOf(FieldShape);

export const SortDataShape = PropTypes.shape({
  field: FieldShape.isRequired,
  desc: PropTypes.bool.isRequired,
  onSort: PropTypes.func.isRequired,
});
