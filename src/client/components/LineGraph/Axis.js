import React, {PropTypes} from 'react';
import SvgPath from 'path-svg/svg-path';
import styles from './styles.css';
import {RectShape} from './shapes';
import {ColShape} from '../Table/shapes';
import {scale} from './geom';

const Axis = ({col, rect, viewBox, ticks, align}) => {
  const d = SvgPath();
  // this is insane
  // probably easier to draw this one way and then transform it into the right position
  if (align === 'bottom') {
    d.to(
        scale(rect.x.lo, [rect.x.lo, rect.x.hi], [viewBox.x, viewBox.x + viewBox.width]),
        scale(rect.y.lo, [rect.y.lo, rect.y.hi], [viewBox.y, viewBox.y + viewBox.height], true))
      .line(
        scale(rect.x.hi, [rect.x.lo, rect.x.hi], [viewBox.x, viewBox.x + viewBox.width]),
        scale(rect.y.lo, [rect.y.lo, rect.y.hi], [viewBox.y, viewBox.y + viewBox.height], true));
  } 
  if (align === 'left') {
    d.to(
        scale(rect.x.lo, [rect.x.lo, rect.x.hi], [viewBox.x, viewBox.x + viewBox.width]),
        scale(rect.y.lo, [rect.y.lo, rect.y.hi], [viewBox.y, viewBox.y + viewBox.height], true))
      .line(
        scale(rect.x.lo, [rect.x.lo, rect.x.hi], [viewBox.x, viewBox.x + viewBox.width]),
        scale(rect.y.hi, [rect.y.lo, rect.y.hi], [viewBox.y, viewBox.y + viewBox.height], true));
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
