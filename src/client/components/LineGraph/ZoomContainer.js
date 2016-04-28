import React, {PropTypes} from 'react';

export const zoomTransform = (zoomLevel, width, height) => {
  const adjustFactor = (1-zoomLevel)/2;
  return `scale(${zoomLevel}) translate(${width*adjustFactor}, ${height*adjustFactor})`;
}

export const ZoomContainer = (props) => {
  const {width, height, zoomLevel} = props;
  return (
    <g transform={zoomTransform(zoomLevel, width, height)}>
      {props.children}
    </g>
  );
};

ZoomContainer.propTypes = {
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  zoomLevel: PropTypes.number.isRequired
};

export default ZoomContainer;
