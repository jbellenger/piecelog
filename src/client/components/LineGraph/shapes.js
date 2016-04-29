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

export const ViewBoxShape = PropTypes.shape({
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
});
