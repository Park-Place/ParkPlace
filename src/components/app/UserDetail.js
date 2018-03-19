import React, { Component } from 'react';
import { connect } from 'react-redux';
import Reviews from './Reviews';
import { Link } from 'react-router-dom';

class UserDetail extends Component {

  render() {

    return (
      <section className="user">
        <div className="nav">
          <ul className="nav">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/UserDetail">User(test)</Link></li>
            <li><Link to="/Park">Park(test)</Link></li>
          </ul>
        </div>
        <div className="user-info">
          <img src="#" alt="#"/>
          <h4>Location: #######</h4>
          <h4>## reviews</h4>
        </div>
        <div>
          <Reviews />
        </div>
      </section>
    );
  }
}

export default connect(
  null
)(UserDetail);