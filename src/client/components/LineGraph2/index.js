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

    rect.x.lo = 100;
    rect.x.hi = 10000;
    rect.x.range = rect.x.hi - rect.x.lo;
    rect.y.lo = 100;
    rect.y.hi = 200;
    rect.y.range = 100;

    /*
    x' = A*x + C*y + E
    y' = B*x + D*y + F
    */
    const matrix = [
      dimensions.width/rect.x.range, // A
      0, // B
      0, // C
      dimensions.height/rect.y.range, // D
      -rect.x.lo * dimensions.width/rect.x.range, // E
      -rect.y.lo * dimensions.height/rect.y.range, // F
    ];

    const invMatrix = [
      rect.x.range/dimensions.width,
      0,
    ];

    const matrixString = `matrix(${matrix.join(',')})`;

    // PROBLEMS: 
    //   - it would be nice to be able to draw points and lines in user-space
    //     coordinates without having to worry about preserving aspect ratio.
    //   - points should have a circular shape, which implies that there's a
    //     way of preserving aspect ratio
    //   - text size should be legible, which probably means that they're
    //     outside of user-space.
    return (
      <svg 
        width={dimensions.width} 
        height={dimensions.height} 
        className={styles.root}>

        <g transform={matrixString}>
          <circle cx={rect.x.lo} cy={rect.y.lo} fill="blue" r={10} />
          <circle cx={rect.x.hi} cy={rect.y.hi} fill="red" r={10} />
        </g>
      </svg>
    );
  }
};
