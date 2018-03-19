import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Header from './Header';
import Search from '../search/Search';

class Home extends Component {

  render() {

    return (
      <div>
        <Header/>
        <Search/>
        <ul className="nav">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/UserDetail">User(test)</Link></li>
          <li><Link to="/Park">Park(test)</Link></li>
          <li><Link to="/User">Sign Up / Sign In</Link></li>
        </ul>
      </div>
    );
  }
}

export default connect(
  null
)(Home);