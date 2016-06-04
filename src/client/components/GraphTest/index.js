import React from 'react';
import styles from './styles.css';
import {VictoryChart} from 'victory';
import {connect} from 'react-redux';
import {selector as modelsSelector} from '../../modules/store/models';
import * as ResultsFields from '../ResultsTable/fields';

const View = ({results}) => {
  console.log('results', results);
  return(
    <VictoryChart 
      data={results}
      x={ResultsFields.STAMP.extractor}
      y={ResultsFields.ENTRY_SPLIT.extractor}
    />
  );
};

export const mapStateToProps = (state) => {
  const models = modelsSelector(state);
  return {
    results: models.results.filterByWorkoutId('6k'),
  };
};

export default connect(mapStateToProps)(View);
