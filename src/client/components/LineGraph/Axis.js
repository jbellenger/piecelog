import React, {PropTypes} from 'react';
import SvgPath from 'path-svg/svg-path';
import styles from './styles.css';
import {DimensionShape} from './shapes';
import {ColShape} from '../Table/shapes';

const Axis = ({col, dimension}) => {
  const d = SvgPath();
  // JMB TODO: draw path
  return <path className={styles.axis} d={d.str()} />;
};

Axis.propTypes = {
  col: ColShape.isRequired,
  dimension: DimensionShape.isRequired,
}

export default Axis;
