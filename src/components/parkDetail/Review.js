import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class Review extends Component {

  render() {

    return (
      <li className="park-review">
        <Link to={`users/${userId}`}className="user-content"> 
          <img src={image}/>
          <h4>{userName}</h4>
        </Link>
        <p>{timeStamp.toLocaleString()}</p>
        <p>{rating}</p>
        <p>{review}</p>
      </li>
    );
  }
}

export default connect(
  null
)(Review);