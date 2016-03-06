import React, { PropTypes } from 'react';

export default class Counter extends React.Component {
  render() {
    return (
      <li>
        <span>value: {this.props.value}</span>
        <button onClick={() => this.props.add(1)}>increment</button>
        <button onClick={() => this.props.add(-1)}>decrement</button>
      </li>
    );
  }
}

Counter.propTypes = {
  add: PropTypes.func.isRequired,
  value: PropTypes.number.isRequired
};
