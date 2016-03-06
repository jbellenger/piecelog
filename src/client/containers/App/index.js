import React from 'react';
import NavBar from '../../components/NavBar';
import { Link } from 'react-router';

export default class App extends React.Component {
  render () {
    return (
      <div>
        <NavBar />
        {this.props.children}
      </div>
    );
  }
}
