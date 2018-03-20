import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class UserDetail extends Component {

  render() {

    const userObject = this.props.reviews;

    return (
      <section className="user">
        {/* <Header/> */}
        <div className="nav">
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/UserDetail">User(test)</Link></li>
            <li><Link to="/Park">Park(test)</Link></li>
          </ul>
        </div>
        {/* <Search/> */}
        <div className="user-info">
          <img src="#" alt="#"/>
          <h4>{userObject.review}</h4>
          <h4>{userObject.parkType}</h4>
          <h4>{userObject.rating}</h4>
        </div>
        <div>
          {/* <Reviews /> */}
        </div>
      </section>
    );
  }
}

export default connect(
  state => ({ reviews: state.reviews }),
  null
)(UserDetail);