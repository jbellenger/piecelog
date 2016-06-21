import React from 'react';
import {VictoryScatter, VictoryLine} from 'victory';

const Inner = (Component, {xfield, yfield, data}) => <Component
  standalone={false}
  data={data}
  x={xfield.extractor}
  y={yfield.extractor}
/>;

const ScatterLine = (props) => (
  <g>
    {Inner(VictoryScatter, props)}
    {Inner(VictoryLine, props)}
  </g>
);

export default ScatterLine;
