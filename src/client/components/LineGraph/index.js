import React,{PropTypes} from 'react';
import styles from './styles.css';
import flatten from 'lodash/flatten';
import values from 'lodash/values';
import classNames from 'classnames';
import sortBy from 'lodash/sortBy';
import ZoomContainer from './ZoomContainer';
import Geometry from '../../modules/geom';
import Point from './Point';
import Axis from './Axis';
import Line from './Line';
import * as Shapes from './shapes';

export default class LineGraph extends React.Component {
  static propTypes = {
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
  };

  points(rows, geometry, index) {
    return rows.map((row) => (
      <Point {...this.props} row={row} geometry={geometry} className={styles['i' + index]} />
    ));
  }

  userSpace({series, xcol, ycol}) {
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

    return [
      [rect.x.lo, rect.x.hi],
      [rect.y.lo, rect.y.hi],
    ];
  }

  svgSpace({width, height}) {
    return [
      [0, width],
      [height, 0],
    ];
  }

  render() {
    const {series, xcol, ycol, width, height} = this.props;
    const geometry = new Geometry(
      this.userSpace(this.props), 
      this.svgSpace(this.props)
    );
    
    const elements = Object.keys(series).map((key, index) => {
      const rows = sortBy(series[key], xcol.extractor);
      const line = <Line key={key} xcol={xcol} ycol={ycol} rows={rows} geometry={geometry} index={index} />
      const points = this.points(rows, geometry, index);
      return [line, points];
    });

    return (
      <svg width={width} height={height} className={styles.root}>
        <ZoomContainer height={height} width={width} zoomLevel={.85}>
          <Axis geometry={geometry} col={xcol} ticks={8} align="bottom" />
          <Axis geometry={geometry} col={ycol} ticks={8} align="left" />
          {flatten(elements)}
        </ZoomContainer>
      </svg>
    );
  }
};
