import React, {PropTypes} from 'react';
import {FieldShape} from '../Table/shapes';
import * as Shapes from './shapes';
import classNames from 'classnames';
import styles from './styles.css';
import Label from './Label';

export const Point = (props) => {
  const {row, xfield, yfield, geometry, onPointClick, labelfield, className} = props;
  let cnames = classNames(className, styles.point);
  if (onPointClick) {
    cnames = classNames(cnames, styles.hot);
  }

  const [x, y] = geometry.map([
    xfield.extractor(row),
    yfield.extractor(row),
  ]);

  return (
    <g className={cnames} onClick={onPointClick && (() => onPointClick(row))}>
      <circle cx={x} cy={y}/>
      <Label x={x} y={y} text={labelfield.apply(row)} />
    </g>
  );
};

Point.propTypes = {
  geometry: Shapes.GeometryShape.isRequired,
  xfield: FieldShape.isRequired,
  yfield: FieldShape.isRequired,
  labelfield: FieldShape.isRequired,
  className: PropTypes.string,
  row: PropTypes.object.isRequired,
  onPointClick: PropTypes.func,
};

export default Point;
