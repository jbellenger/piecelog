import React from 'react';
import styles from './styles.css';

export default (props) => (
  <svg
      version='1.1'
      baseProfile='full'
      width='100%'
      height='100%'
      className={styles.root}
      xmlns='http://www.w3.org/2000/svg'>
    {/*
    <rect width='100%' height='100%' fill='red' />
    <circle cx='50%' cy='50%' r='80' fill='green' />
    <text x='50%' y='50%' fontSize='60' textAnchor='middle' fill='white'>SVG</text>
    <polyline points='60 110, 65 120, 70 115, 75 130, 80 125, 85 140, 90 135, 95 150, 100 145'/>
    */}
    <path d='M100 100 h100 v100 h-100 z' />
    <rect />
  </svg>
);
