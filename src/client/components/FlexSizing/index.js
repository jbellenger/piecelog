import React from 'react';
import { WindowResizeListener } from 'react-window-resize-listener'

const defaultState = {height: 0, width: 0, sized: false};

const FlexSizing = Inner => class extends React.Component {
  constructor(...args) {
    super(...args);
    this.state = defaultState;
  }

  _resize() {
    // need to reset size to 0 to properly measure available container size
    // not doing this makes it impossible to shrink a component
    if (this.state.sized) {
      this.setState(defaultState);
    }

    const { div } = this.refs;
    if (this.state.height !== div.clientHeight || this.width !== div.clientWidth) {
      const state = {
        sized: true,
        height: div.clientHeight,
        width: div.clientWidth
      };
      this.setState(state);
    }
  }

  render() {
    const styles = {
      visibility: this.state.sized ? 'visible' : 'hidden',
      display: 'flex',
      flex: '1 1 auto'
    };

    return (
      <div style={styles} ref="div">
        <WindowResizeListener onResize={() => this._resize()} />
        <Inner {...this.props} height={this.state.height} width={this.state.width} />
      </div>
    );
  }
};

export default FlexSizing;
