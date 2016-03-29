import LogTable from '../../components/LogTable';
import LogTableControls from '../../components/LogTableControls';
import { connect } from 'react-redux';
import React from 'react';
import styles from './styles.css';
import FlexSizing from '../../components/FlexSizing';
import Debug from '../../components/Debug';
import { ALL_LOG_QUERY } from '../../modules/query';

const mapStateToProps = (state) => {
  const query = state.query[ALL_LOG_QUERY];
  const rows = state.models.exec(query);
  return {rows};
};

export class LogTableContainer extends React.Component {
  render() {
    return (
      <section className={styles.root}>
        <LogTableControls />
        <LogTable {...this.props}/>
      </section>
    );
  }
}

export default connect(mapStateToProps)(LogTableContainer);
