import LogTable from '../../components/LogTable';
import { connect } from 'react-redux';

const mapStateToProps = state => ({rows: state.log});

const LogTableContainer = connect(mapStateToProps)(LogTable);

export default LogTableContainer;
