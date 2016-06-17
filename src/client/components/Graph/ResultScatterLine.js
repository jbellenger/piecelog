import React from 'react';
import {VictoryScatter, VictoryLine} from 'victory';

const Inner = (Component, {xField, yField, meanField, objs}) => <Component
  data={objs}
  x={xField.extractor}
  y={yField.extractor}
/>;

const ResultScatterLine = (props) => [
  Inner(VictoryScatter, props),
  Inner(VictoryLine, props),
];

export default ResultScatterLine;
