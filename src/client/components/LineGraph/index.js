import React,{PropTypes} from 'react';
import styles from './styles.css';
import flatten from 'lodash/flatten';
import classNames from 'classnames';
import SvgPath from 'path-svg/svg-path';
import sortBy from 'lodash/sortBy';
import ZoomContainer from './ZoomContainer';
import * as geom from './geom';
import Point from './Point';
import Axis from './Axis';
import Line from './Line';
import * as Shapes from './shapes';

export default class LineGraph extends React.Component {
  static propTypes = {
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
    viewBox: Shapes.ViewBoxShape.isRequired,
  };

  points(rows, rect, index) {
    return rows.map((row) => (
      <Point {...this.props} row={row} rect={rect} className={styles['i' + index]} />
    ));
  }

  render() {
    const {series, xcol, ycol, viewBox} = this.props;
    const rect = geom.rect(this.props);
    
    const elements = Object.keys(series).map((key, index) => {
      const rows = sortBy(series[key], xcol.extractor);
      const line = <Line key={key} xcol={xcol} ycol={ycol} viewBox={viewBox} rect={rect} rows={rows} rect={rect} index={index} />
      const points = this.points(rows, rect, index);
      return [line, points];
    });

    return (
      <svg width={viewBox.width} height={viewBox.height} className={styles.root}>
        <ZoomContainer viewBox={viewBox} zoomLevel={.75}>
          <Axis rect={rect} viewBox={viewBox} col={xcol} ticks={8} align="bottom"/>
          <Axis rect={rect} viewBox={viewBox} col={ycol} ticks={8} align="left" />
          {flatten(elements)}
        </ZoomContainer>
      </svg>
    );
  }
};
