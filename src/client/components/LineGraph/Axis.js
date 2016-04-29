import React, {PropTypes} from 'react';
import SvgPath from 'path-svg/svg-path';
import styles from './styles.css';
import {RectShape} from './shapes';
import {ColShape} from '../Table/shapes';

const Axis = ({col, rect, ticks, align}) => {
  const d = SvgPath();
  // JMB TODO: draw path
  if (align === 'bottom') {
    d.to(rect.x.lo, rect.y.hi)
      .line(rect.x.hi, rect.y.hi);
  } 
  if (align === 'left') {
    d.to(rect.x.lo, rect.y.lo)
      .line(rect.x.hi, rect.y.lo);
  }

  return <path className={styles.axis} d={d.str()} />;
};

Axis.propTypes = {
  col: ColShape.isRequired,
  rect: RectShape.isRequired,
  ticks: PropTypes.number.isRequired,
  align: PropTypes.string.isRequired,
}

export default Axis;
