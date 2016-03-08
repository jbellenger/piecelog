import React from 'react';
import { Link } from 'react-router';
import TopNav from '../TopNav';
import Footer from '../Footer';

export default class Page extends React.Component {
  render () {
    return (
      <div>
        <TopNav />
        {this.props.children}
        <Footer />
      </div>
    );
  }
}
