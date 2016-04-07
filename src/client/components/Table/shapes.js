import {PropTypes} from 'react';
import Col from './Col';

export const RowShape = PropTypes.object;

export const RowsShape = PropTypes.arrayOf(RowShape);

export const ColShape = PropTypes.instanceOf(Col);

export const ColsShape = PropTypes.arrayOf(ColShape);

export const SortDataShape = PropTypes.shape({
  col: ColShape.isRequired,
  desc: PropTypes.bool.isRequired,
  onSort: PropTypes.func.isRequired,
});
