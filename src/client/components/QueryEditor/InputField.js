import React from 'react';
import styles from './styles.css';

export default class InputField extends React.Component {
  render() {
    const onInput = (evt) => {
      const input = this.refs.input.innerHTML;
      this.props.onChange(input);
    };

    return (
      <div ref="input" onInput={onInput} className={styles.InputField} contentEditable="true"/>
    );
  }
}

InputField.propTypes = {
  onChange: React.PropTypes.func.isRequired
};
