import React,{PropTypes} from 'react';
import SvgPath from 'path-svg/svg-path';
import styles from './styles.css';
import {GeometryShape} from './shapes';

const Tick = ({fraction, field, geometry, align, tickLength}) => {
  const {x, y} = geometry;

  let start, end, label;

  if (align === 'bottom') {
    const userx = x.value(fraction);
    const svgx = x.map(userx);
    start = [svgx, y.toRange[0]];
    end = [svgx, y.toRange[0] + tickLength];
    label = field.formatter(userx);
  }

  if (align === 'left') {
    const usery = y.value(fraction);
    const svgy = y.map(usery);
    start = [x.toRange[0], svgy];
    end = [x.toRange[0] - tickLength, svgy];
    label = field.formatter(usery);
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
