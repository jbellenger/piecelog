import React, {PropTypes} from 'react';
import {ColShape} from '../Table/shapes';
import * as Shapes from './shapes';
import classNames from 'classnames';
import * as geom from './geom';
import styles from './styles.css';

export const Point = (props) => {
  const {row, rect, onPointClick, labelcol, className} = props;
  let cnames = classNames(className, styles.point);
  if (onPointClick) {
    cnames = classNames(cnames, styles.hot);
  }

  const [x, y] = geom.coords(props);
  return (
    <g className={cnames} 
      onClick={onPointClick && (() => onPointClick(row))}>
      <circle cx={x} cy={y}/>
      <text x={x} y={y}>
        {labelcol.apply(row)}
      </text>
    </g>
  );
};

Point.propTypes = {
  rect: Shapes.RectShape.isRequired,
  className: PropTypes.string,
  row: PropTypes.object.isRequired,
  labelcol: ColShape.isRequired,
  onPointClick: PropTypes.func,
};

export default Point;
