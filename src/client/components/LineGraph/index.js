import React,{PropTypes} from 'react';
import styles from './styles.css';
import values from 'lodash/values';
import flatten from 'lodash/flatten';
import classNames from 'classnames';
import SvgPath from 'path-svg/svg-path'
import sortBy from 'lodash/sortBy';
import ZoomContainer from './ZoomContainer';

export default class LineGraph extends React.Component {
  static propTypes = {
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
  };

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
    const {xcol, ycol, width, height} = this.props;
    return [
      (xcol.extractor(row) - rect.x.lo) * width/rect.x.range, 
      (rect.y.hi - ycol.extractor(row)) * height/rect.y.range
    ];
  }

  points(rows, rect, index) {
    const indexStyle = styles["i" + index];
    const {labelcol, onPointClick} = this.props;
    let cnames = classNames(styles.point, indexStyle);
    if (onPointClick) {
      cnames = classNames(cnames, styles.hot);
    }

    return rows
      .map((row) => {
        const [x, y] = this.coords(row, rect);
        return (
          <g className={cnames} 
            onClick={onPointClick && (() => onPointClick(row))}>
            <circle cx={x} cy={y}/>
            <text x={x} y={y}>
              {labelcol.apply(row)}
            </text>
          </g>
        );
      });
  }

  line(key, rows, rect, index) {
    if (rows.length < 2) return null;

    const {onSeriesClick} = this.props;

    const head = this.coords(rows[0], rect);
    const d = SvgPath()
      .to(head[0], head[1]);

    rows.slice(1).forEach((row) => {
      const [x, y] = this.coords(row, rect);
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

  zoomTransform(zoomLevel) {
    const {width, height} = this.props;
    const adjustFactor = (1-zoomLevel)/2;
    return `scale(${zoomLevel}) translate(${width*adjustFactor}, ${height*adjustFactor})`;
  }

  render() {
    const {series, xcol, width, height} = this.props;
    const rect = this.rect();
    
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
