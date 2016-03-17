import React from 'react';
import styles from './styles.css';

export default class InputField extends React.Component {
  render() {
    const {text, onChange} = this.props;

    const onInput = (evt) => {
      const input = this.refs.input.innerText;
      console.log('onInput', input);
      onChange(input);
    };

    return (
      <div ref="input" onInput={onInput} className={styles.InputField} contentEditable="true">
        {text}
      </div>
    );
  }
}

InputField.propTypes = {
  text: React.PropTypes.string,
  onChange: React.PropTypes.func.isRequired
};
