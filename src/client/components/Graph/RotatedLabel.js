import React from 'react';
import {VictoryLabel} from 'victory';

const RotatedLabel = (angle) => (props) => (
  <VictoryLabel {...props} angle={angle} textAnchor={"end"} />
);

export default RotatedLabel(-25);
