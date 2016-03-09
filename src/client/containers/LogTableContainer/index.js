import LogTable from '../../components/LogTable';
import LogTableControls from '../../components/LogTableControls';
import { connect } from 'react-redux';
import React from 'react';
import styles from './styles.css';

const mapStateToProps = state => ({rows: state.log.view});

// @connect(mapStateToProps)
export class LogTableContainer extends React.Component {
  componentDidMount(...args) {
    const { section } = this.refs;
    if (section.clientHeight !== section.parentNode.clientHeight) {
      this.setState({height: section.parentNode.clientHeight});
    }
  }

  render() {
    const { height = 0 } = (this.state || {});

    return (
      <section ref="section" className={styles.root}>
        <LogTableControls />
        <LogTable {...this.props} height={height}/>
      </section>
    );
  }
}

export default connect(mapStateToProps)(LogTableContainer);
