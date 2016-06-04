import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {selector as modelsSelector} from '../../modules/store/models';
import Table from '../Table';
import * as PersonFields from './fields';

const PersonIndexView = ({persons}) => (
  <div>
    <h1>People</h1>
    <Table 
      rows={persons}
      fields={[
        PersonFields.ID,
        PersonFields.RACINGAGE,
      ]}
    />
  </div>
);

export const mapStateToProps = (state) => {
  const models = modelsSelector(state);
  return { persons: models.persons.persons };
};

export default connect(mapStateToProps)(PersonIndexView);
