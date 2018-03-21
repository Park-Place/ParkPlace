import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class Review extends Component {

  render() {
    const { userObj, timeStamp, rating, review } = this.props;
    const { userId, image, userName } = userObj;
    

    return (
      <li className="user-review">
        <h4>{userName}</h4>
        <img src={image}/>
        <p>{timeStamp}</p>
        <p>{rating}</p>
        <p>{review}</p>
      </li>
    );
  }
}

export default connect(
  // state => ({ reviews: state.reviews }),
  null
)(Review);

{/* <Link to={`/users/${userId}`}className="user-content"> 
          <img src={image}/>
          <h4>{userName}</h4>
        </Link> */}