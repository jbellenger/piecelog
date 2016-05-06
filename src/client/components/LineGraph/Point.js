import React, {PropTypes} from 'react';
import {ColShape} from '../Table/shapes';
import * as Shapes from './shapes';
import classNames from 'classnames';
import styles from './styles.css';
import Label from './Label';

export const Point = (props) => {
  const {row, xcol, ycol, geometry, onPointClick, labelcol, className} = props;
  let cnames = classNames(className, styles.point);
  if (onPointClick) {
    cnames = classNames(cnames, styles.hot);
  }

  const [x, y] = geometry.map([
    xcol.extractor(row),
    ycol.extractor(row),
  ]);

  return (
    <g className={cnames} onClick={onPointClick && (() => onPointClick(row))}>
      <circle cx={x} cy={y}/>
      <Label x={x} y={y} text={labelcol.apply(row)} />
    </g>
  );
};

Point.propTypes = {
  geometry: Shapes.GeometryShape.isRequired,
  xcol: ColShape.isRequired,
  ycol: ColShape.isRequired,
  labelcol: ColShape.isRequired,
  className: PropTypes.string,
  row: PropTypes.object.isRequired,
  onPointClick: PropTypes.func,
};

export default Point;
