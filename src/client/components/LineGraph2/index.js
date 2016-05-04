import React,{PropTypes} from 'react';
import styles from './styles.css';
import flatten from 'lodash/flatten';
import classNames from 'classnames';
import SvgPath from 'path-svg/svg-path';
import sortBy from 'lodash/sortBy';
import * as geom from '../LineGraph/geom';

export default class LineGraph extends React.Component {
  render() {
    const {series, xcol, ycol, dimensions} = this.props;
    const rect = geom.rect(this.props);
    console.log('rect', rect);

    return (
      <svg 
        width={dimensions.width} 
        height={dimensions.height} 
        viewBox={[rect.x.lo, rect.y.lo, rect.x.range, rect.y.range]}
        className={styles.root}>
        <circle cx={rect.x.lo} cy={rect.y.lo} r={5} fill="blue"/>
        <circle cx={rect.x.hi} cy={rect.y.hi} r={5} fill="red" />
      </svg>
    );
  }
};
