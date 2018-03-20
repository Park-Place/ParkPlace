import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Search from '../search/Search';
import ReviewForm from '../reviewForm/ReviewForm';

class Home extends Component {

  render() {

    return (
      <div>
        <Search/>
        <ReviewForm/>
        <ul className="nav">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/UserDetail">User(test)</Link></li>
          <li><Link to="/Park">Park(test)</Link></li>
          <li><Link to="/auth/Signin">Sign In</Link> / <Link to="/auth/Signup">Signup</Link></li>
        </ul>
      </div>
    );
  }
}

export default connect(
  null
)(Home);