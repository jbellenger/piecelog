import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import LogTable from '../LogTable';
import LogEvent from '../../modules/model/LogEvent';
import { selector as modelsSelector } from '../../modules/store/models';

export class View extends React.Component {
  static propTypes = {
    person: PropTypes.object.isRequired
  };

  render() {
    const { person } = this.props;
    return (
      <div>
        <h1>Person: {person.person_id}</h1>
        {this.props.children}
      </div>
    );
  }
}

export const mapStateToProps = (state, props) => {
  const { personId } = props;

  return {
    ...props,
    person: modelsSelector(state).exec('select * from person where person_id=?', [personId])[0],
  };
};

export default connect(mapStateToProps)(View);
