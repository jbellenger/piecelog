import React,{PropTypes} from 'react';
import styles from './styles.css';
import values from 'lodash/values';
import flatten from 'lodash/flatten';
import classNames from 'classnames';

export default class LineGraph extends React.Component {
  rect() {
    const {series, xcol, ycol} = this.props;
    const rect = {x: {}, y: {}};

    values(series).forEach((rows) => {
      rows.forEach((row) => {
        const x = xcol.extractor(row);
        const y = ycol.extractor(row);

        if (rect.x.lo === undefined || x < rect.x.lo) {
          rect.x.lo = x;
        }
        if (rect.x.hi === undefined || x > rect.x.hi) {
          rect.x.hi = x;
        }
        if (rect.y.lo === undefined || y < rect.y.lo) {
          rect.y.lo = y;
        }
        if (rect.y.hi === undefined || y > rect.y.hi) {
          rect.y.hi = y;
        }
      });
    });
    if (rect.x.lo !== undefined) {
      rect.x.range = rect.x.hi - rect.x.lo;
    }
    if (rect.y.lo !== undefined) {
      rect.y.range = rect.y.hi - rect.y.lo;
    }

    return rect;
  }

  coords(row, rect) {
    const {xcol, ycol} = this.props;
    const x = (xcol.extractor(row) - rect.x.lo)/rect.x.range * 100 + "%";
    const y = (1 - (ycol.extractor(row) - rect.y.lo)/rect.y.range) * 100 + "%";

    return [x, y];
  }

  point(row, rect, index) {
    const cnames = classNames(styles.point, styles["i" + index]);
    const [x, y] = this.coords(row, rect)
    const {labelcol} = this.props;

    return (
      <g>
        <circle cx={x} cy={y} className={cnames} />
        <text x={x} y={y}>{labelcol.apply(row)}</text>
      </g>
    );
  }

  render() {
    const {series} = this.props;
    const rect = this.rect();
    
    const pointSets = values(series)
      .map((rows, i) => {
        return rows.map((row) => this.point(row, rect, i));
      });

    return (
      <svg className={styles.root}>
        <g className={styles.zoomContainer}>
          {flatten(pointSets)}
        </g>
      </svg>
    );
  }
};
