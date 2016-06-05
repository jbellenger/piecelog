import React from 'react';
import styles from './styles.css';
import {VictoryChart, VictoryScatter, VictoryAxis} from 'victory';
import {connect} from 'react-redux';
import {selector as modelsSelector} from '../../modules/store/models';
import * as ResultFields from '../ResultsTable/fields';
import d3 from 'd3';

const View = ({results}) => {
  console.log('results', results);
  return(
    <VictoryChart>
      <VictoryScatter
        standalone={false}
        data={results}
        x={ResultFields.STAMP.extractor}
        y={(o) => ResultFields.ENTRY_SPLIT.extractor(o)[0]}
      />
      <VictoryAxis
        label={ResultFields.STAMP.header}
        tickFormat={ResultFields.STAMP.formatter}
        standalone={false}
      />
      <VictoryAxis
        dependentAxis
        label={ResultFields.ENTRY_SPLIT.header}
        standalone={false}
      />
    </VictoryChart>
  );
};

export const mapStateToProps = (state) => {
  const models = modelsSelector(state);
  return {
    results: models.results.filterByWorkoutId('2x22min'),
  };
};

export default connect(mapStateToProps)(View);
