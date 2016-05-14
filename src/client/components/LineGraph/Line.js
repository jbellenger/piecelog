import React, {PropTypes} from 'react';
import SvgPath from 'path-svg/svg-path';
import classNames from 'classnames';
import {FieldShape} from '../Table/shapes';
import * as Shapes from './shapes';
import styles from './styles.css';

export default class Line extends React.Component {
  static propTypes = {
    onSeriesClick: PropTypes.func,
    rows: PropTypes.array.isRequired,
    key: PropTypes.string.isRequired,
    geometry: Shapes.GeometryShape.isRequired,
    xfield: FieldShape.isRequired,
    yfield: FieldShape.isRequired,
  };

  render() {
    const {rows, geometry, xfield, yfield, onSeriesClick, key, index} = this.props;
    if (rows.length < 2) return null;

    const coords = (row) => geometry.map([
      xfield.extractor(row),
      yfield.extractor(row),
    ]);

    const head = coords(rows[0]);
    const d = SvgPath()
      .to(head[0], head[1]);

    rows.slice(1).forEach((row) => {
      const [x, y] = coords(row);
      d.line(x, y);
    });

    let cnames = classNames(styles.line, styles["i"+index]);
    if (onSeriesClick) {
      cnames = classNames(cnames, styles.hot);
    }

    return <path 
      className={cnames} 
      onClick={onSeriesClick && (() => onSeriesClick(key))}
      d={d.str()} />;
  }
}
