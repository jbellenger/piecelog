import React, {PropTypes} from 'react';
import {GeometryShape} from './shapes';

export const zoomTransform = (width, height, zoomLevel) => {
  const adjustFactor = (1-zoomLevel)/2;
  return `scale(${zoomLevel}) translate(${width*adjustFactor}, ${height*adjustFactor})`;
}

export const ZoomContainer = ({width, height, zoomLevel, ...rest}) => {
  return (
    <g transform={zoomTransform(width, height, zoomLevel)}>
      {rest.children}
    </g>
  );
};

ZoomContainer.propTypes = {
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  zoomLevel: PropTypes.number.isRequired
};

export default ZoomContainer;
