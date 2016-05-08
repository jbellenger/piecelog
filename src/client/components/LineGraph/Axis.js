import React, {PropTypes} from 'react';
import SvgPath from 'path-svg/svg-path';
import styles from './styles.css';
import {GeometryShape} from './shapes';
import {ColShape} from '../Table/shapes';
import classNames from 'classnames';
import * as Shapes from './shapes';
import Tick from './Tick';

const Axis = ({col, geometry, tickCount, align}) => {
  const {x, y} = geometry;
  const d = SvgPath();
  if (align === 'bottom') {
    d.to(x.toRange[0], y.toRange[0])
      .line(x.toRange[1], y.toRange[0]);
  } 
  if (align === 'left') {
    d.to(x.toRange[0], y.toRange[0])
      .line(x.toRange[0], y.toRange[1]);
  }

  const ticks = [];
  for (let i=0; i < tickCount; ++i) {
    ticks.push(<Tick fraction={i/tickCount} col={col} geometry={geometry} align={align} />);
  }

  const cnames = classNames(styles.axis, styles['axis-' + align]);
  return (
    <g>
      <path className={cnames} d={d.str()} />
      {ticks}
    </g>
  );
};

Axis.propTypes = {
  col: ColShape.isRequired,
  geometry: GeometryShape.isRequired,
  ticks: PropTypes.number.isRequired,
  align: PropTypes.string.isRequired,
}

export default Axis;
