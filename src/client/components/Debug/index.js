import React from 'react';

export default class Debug extends React.Component {
  render() {
    return (
      <div style={this.props}> 
        {this.props.children}
      </div>
    );
  }
}
