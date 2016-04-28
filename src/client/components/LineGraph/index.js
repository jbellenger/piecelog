import React,{PropTypes} from 'react';
import styles from './styles.css';
import flatten from 'lodash/flatten';
import classNames from 'classnames';
import SvgPath from 'path-svg/svg-path'
import sortBy from 'lodash/sortBy';
import ZoomContainer from './ZoomContainer';
import * as geom from './geom';
import Point from './Point';

export default class LineGraph extends React.Component {
  static propTypes = {
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
  };

  points(rows, rect, index) {
    return rows.map((row) => (
      <Point {...this.props} row={row} rect={rect} className={styles['i' + index]} />
    ));
  }

  line(key, rows, rect, index) {
    if (rows.length < 2) return null;

    const {onSeriesClick} = this.props;

    const head = geom.coords({row: rows[0], rect, ...this.props});
    const d = SvgPath()
      .to(head[0], head[1]);

    rows.slice(1).forEach((row) => {
      const [x, y] = geom.coords({row, rect, ...this.props});
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

  axes(rect) {
    const {xcol, ycol} = this.props;
    const xd = SvgPath()
      .to(rect.x.lo, rect.y.hi)
      .line(rect.x.hi, rect.y.hi);
    const xaxis = <path className="axis x-axis" d={xd.str()} />;

    const yd = SvgPath()
      .to(rect.x.lo, rect.y.lo)
      .to(rect.x.lo, rect.y.hi);
    const yaxis = <path className="axis y-axis" d={yd.str()} />;

    return [xaxis, yaxis];
  }

  render() {
    const {series, xcol, width, height} = this.props;
    const rect = geom.rect(this.props);
    
    const elements = Object.keys(series).map((key, index) => {
      const rows = sortBy(series[key], xcol.extractor);
      const line = this.line(key, rows, rect, index);
      const points = this.points(rows, rect, index);
      return [line, points];
    });

    return (
      <svg width={width} height={height} className={styles.root}>
        <ZoomContainer width={width} height={height} zoomLevel={.75}>
          {flatten(this.axes(rect))}
          {flatten(elements)}
        </ZoomContainer>
      </svg>
    );
  }
};
