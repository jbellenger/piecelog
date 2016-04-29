import React, {PropTypes} from 'react';
import {ViewBoxShape} from './shapes';

export const zoomTransform = (viewBox, zoomLevel) => {
  const adjustFactor = (1-zoomLevel)/2;
  return `scale(${zoomLevel}) translate(${viewBox.width*adjustFactor}, ${viewBox.height*adjustFactor})`;
}

export const ZoomContainer = ({viewBox, zoomLevel, ...rest}) => {
  return (
    <g transform={zoomTransform(viewBox, zoomLevel)}>
      {rest.children}
    </g>
  );
};

ZoomContainer.propTypes = {
  viewBox: ViewBoxShape.isRequired,
  zoomLevel: PropTypes.number.isRequired
};

export default ZoomContainer;
