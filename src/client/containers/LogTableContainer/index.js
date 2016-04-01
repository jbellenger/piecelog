import LogTable from '../../components/LogTable';
import LogTableControls from '../../components/LogTableControls';
import { connect } from 'react-redux';
import React from 'react';
import styles from './styles.css';
import FlexSizing from '../../components/FlexSizing';
import Debug from '../../components/Debug';
import LogEvent from '../../modules/model/LogEvent';
import { selector as modelsSelector } from '../../modules/store/models';

const mapStateToProps = (state) => {
  const models = modelsSelector(state);
  const rows = models.exec(`select ${LogEvent.fields.join(',')} from log`);
  return { rows };
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
