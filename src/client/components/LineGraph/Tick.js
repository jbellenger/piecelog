import React,{PropTypes} from 'react';
import SvgPath from 'path-svg/svg-path';
import styles from './styles.css';
import {GeometryShape} from './shapes';

const Tick = ({fraction, col, geometry, align}) => {
  const d = SvgPath();
  const {x, y} = geometry;

  if (align === 'bottom') {
    const xbase = x.toRange[0] + fraction*(x.toRange[1] - x.toRange[0]    d.to(
        ),
        y.toRange[0])
      .line(
        x.
      );
  }

  if (align === 'left') {
  }

  return <tspan>tick</tspan>;
};

Tick.propTypes = {
  geometry: GeometryShape.isRequired,
};

export default Tick;
