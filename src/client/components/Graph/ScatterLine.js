import React from 'react';
import {VictoryScatter, VictoryLine} from 'victory';

const Inner = (Component, {domain, xfield, yfield, data}) => {
  return (
    <Component
      domain={domain}
      standalone={false}
      data={data}
      x={xfield.extractor}
      y={yfield.extractor}
    />
  );
};

const fillDomain = (props) => {
  const {data, xfield, yfield} = props;
  const xs = data.map(xfield.extractor);
  const ys = data.map(yfield.extractor);

  const domain = {
    x: [Math.min(...xs), Math.max(...xs)],
    y: [Math.min(...ys), Math.max(...ys)],
  };

  return {domain, ...props};
};

const ScatterLine = (props) => {
  // Domain auto calculation doesn't seem to work.
  const fixedProps = props.domain === undefined ? 
    fillDomain(props) : props;

  const children = [
    Inner(VictoryScatter, fixedProps),
    Inner(VictoryLine, fixedProps),
  ];

  return children;
};

export default ScatterLine;
