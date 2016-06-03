import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {selector as modelsSelector} from '../../modules/store/models';
import ResultsTable from '../ResultsTable';
import * as ResultsFields from '../ResultsTable/fields';

export class PersonView extends React.Component {
  static propTypes = {
    person: PropTypes.object.isRequired
  };

  render() {
    const {person, results} = this.props;
    return (
      <div>
        <h1>{person.id}</h1>
        <ResultsTable 
          results={results} 
          fields={[
            ResultsFields.STAMP,
            ResultsFields.WORKOUT_ID,
            ResultsFields.WEIGHT_POUNDS,
            ResultsFields.ENTRY_SPLIT,
          ]}
          sortField={ResultsFields.STAMP}
          sortDesc={true}
        />
      </div>
    );
  }
}

export const mapStateToProps = (state, {personId}) => {
  const models = modelsSelector(state);
  const results = models.results.filterByPersonId(personId);
  const person = models.persons.findById(personId);
  return {results, person};
};

export default connect(mapStateToProps)(PersonView);
