import React from 'react';
import styles from './styles.css';

export default class InputField extends React.Component {
  render() {
    const {text, onChange} = this.props;
    const onInput = (evt) => onChange(this.refs.input.innerText);

    return (
      <div
        ref="input"
        onInput={onInput}
        className={styles.InputField}
        contentEditable="true"
        content={text} />
    );
  }
}

InputField.propTypes = {
  text: React.PropTypes.string,
  onChange: React.PropTypes.func.isRequired
};
