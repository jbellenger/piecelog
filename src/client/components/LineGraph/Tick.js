import React,{PropTypes} from 'react';
import SvgPath from 'path-svg/svg-path';
import styles from './styles.css';
import {GeometryShape} from './shapes';

const Tick = ({fraction, col, geometry, align, tickLength}) => {
  const d = SvgPath();
  const {x, y} = geometry;

  if (align === 'bottom') {
    const xbase = x.toRange[0] + fraction*(x.toRange[1] - x.toRange[0]);
    d.to(xbase, y.toRange[0])
      .line(xbase, y.toRange[0] + tickLength)
  }

  if (align === 'left') {
    const ybase = y.toRange[0] + fraction*(y.toRange[1] - y.toRange[0]);
    d.to(x.toRange[0], ybase)
      .line(x.toRange[0] - tickLength, ybase);
  }

  return (
    <g className={styles.tick}>
      <path d={d.str()} />
      <text>tick</text>
    </g>
  );
};

Tick.propTypes = {
  geometry: GeometryShape.isRequired,
};

Tick.defaultProps = {
  tickLength: 10,
};

export default Tick;
