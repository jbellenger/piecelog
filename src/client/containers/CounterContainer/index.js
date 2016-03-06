import Counter from '../../components/Counter';
import { connect } from 'react-redux';
import { increment } from '../../modules/store/counter';

const mapStateToProps = (state) => {
  return {
    value: state.count.value
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    add: (delta) => dispatch(increment(delta))
  };
};

const CounterContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Counter);

export default CounterContainer;
