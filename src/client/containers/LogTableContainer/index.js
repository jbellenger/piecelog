import LogTable from '../../components/LogTable';
import LogTableControls from '../../components/LogTableControls';
import { connect } from 'react-redux';
import React from 'react';
import styles from './styles.css';

const mapStateToProps = state => ({rows: state.log.view});

// @connect(mapStateToProps)
export class LogTableContainer extends React.Component {
  render() {
    return (
      <section className={styles.root}>
        <LogTableControls />
        <LogTable {...this.props} />
      </section>
    );
  }
}

export default connect(mapStateToProps)(LogTableContainer);

// const LogTableContainer = connect(mapStateToProps)(LogTable);
// export default LogTableContainer;
