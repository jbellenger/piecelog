import React, {PropTypes} from 'react';
import SvgPath from 'path-svg/svg-path';
import styles from './styles.css';
import {GeometryShape} from './shapes';
import {ColShape} from '../Table/shapes';
import classNames from 'classnames';
import * as Shapes from './shapes';

const Axis = ({col, geometry, ticks, align}) => {
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

  const cnames = classNames(styles.axis, styles['axis-' + align]);
  return <path className={cnames} d={d.str()} />;
};

Axis.propTypes = {
  col: ColShape.isRequired,
  geometry: GeometryShape.isRequired,
  ticks: PropTypes.number.isRequired,
  align: PropTypes.string.isRequired,
}

export default Axis;
