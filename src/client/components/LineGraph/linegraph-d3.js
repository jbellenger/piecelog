import React,{PropTypes} from 'react';
import {LineChart} from 'rd3';
import sortBy from 'lodash/sortBy';

export default class LineGraph extends React.Component {
  render() {
    const {series, xcol, ycol} = this.props;
    /*
    var lineData = [
      {
        name: "series1",
        values: [ { x: 0, y: 20 }, ..., { x: 24, y: 10 } ],
        strokeWidth: 3,
        strokeDashArray: "5,5",
      },
      ....
      {
        name: "series2",
        values: [ { x: 70, y: 82 }, ..., { x: 76, y: 82 } ]
      }
    ];
    */

    const lineData = Object.keys(series).map((key) => {
      const values = series[key].map((row) => {
        return {x: xcol.extractor(row), y: ycol.extractor(row)};
      });

      return {
        name: key,
        values: sortBy(values, xcol.extractor)
      };
    });
    console.log('lineData', lineData);

    return (
      <LineChart
        legend={true}
        data={lineData}
        width={600}
        height={300}
        showTooltip={false}
        xAxisLabel={xcol.header}
        xAxisFormatter={xcol.formatter}
        xAxisTickCount={5}
        yAxisLabel={ycol.header}
        yAxisFormatter={ycol.formatter}
        yAxisTickCount={5}
        gridHorizontal={true}
      />
    );
  }
};
