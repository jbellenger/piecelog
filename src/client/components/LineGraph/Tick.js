import React,{PropTypes} from 'react';
import SvgPath from 'path-svg/svg-path';
import styles from './styles.css';
import {GeometryShape} from './shapes';

const Tick = ({fraction, col, geometry, align, tickLength}) => {
  const {x, y} = geometry;

  let start, end, label;

  if (align === 'bottom') {
    const xbase = x.toRange[0] + fraction*(x.toRange[1] - x.toRange[0]);
    start = [xbase, y.toRange[0]];
    end = [xbase, y.toRange[0] + tickLength];
    label = xbase;
  }

  if (align === 'left') {
    const ybase = y.toRange[0] + fraction*(y.toRange[1] - y.toRange[0]);
    start = [x.toRange[0], ybase];
    end = [x.toRange[0] - tickLength, ybase];
    label = ybase;
  }

  const d = SvgPath().to(...start).line(...end);
  return (
    <g className={styles.tick}>
      <path d={d.str()} />
      <text textAnchor="middle" x={end[0]} y={end[1]}>
        {label}
      </text>
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
