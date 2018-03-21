import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class UserDetail extends Component {

  render() {
    return(
      <section className="main">
        <section classNme="user_info">
          <p>Name: {name}</p>
          <p>Location: {location}</p>
          <img src={user_image}/>

        </section>
        <section className="user-review-list">
          <ul>
            {/* <Review> */}
          </ul>
        </section>
      </section>
    );
  }


}