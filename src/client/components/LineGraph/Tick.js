import React,{PropTypes} from 'react';
import SvgPath from 'path-svg/svg-path';
import styles from './styles.css';
import {GeometryShape} from './shapes';

const Tick = ({index, col, geometry, align}) => {
  const d = SvgPath();
  const {x, y} = geometry;

  if (align === 'bottom') {
  }

  if (align === 'left') {
  }

  return <tspan>tick</tspan>;
};

Tick.propTypes = {
  geometry: GeometryShape.isRequired,
};

export default Tick;
