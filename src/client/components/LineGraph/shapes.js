import {PropTypes} from 'react';

export const DimensionShape = PropTypes.shape({
  hi: PropTypes.number.isRequired,
  lo: PropTypes.number.isRequired,
  range: PropTypes.number.isRequired,
});

export const RectShape = PropTypes.shape({
  x: DimensionShape,
  y: DimensionShape,
});
