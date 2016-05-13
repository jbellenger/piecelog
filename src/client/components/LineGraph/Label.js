import React,{PropTypes} from 'react';
import styles from './styles.css';

const Label = ({x, y, text}) => (
  <g className={styles.label}>
    <text textAnchor="middle" x={x} y={y}>{text}</text>
  </g>
);

Label.propTypes = {
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired,
  text: PropTypes.string.isRequired,
};

export default Label;
