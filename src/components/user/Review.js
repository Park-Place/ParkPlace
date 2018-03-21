import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { getParkImage } from '../../services/googleAPI';


class Review extends Component {

  render() {
    const { timeStamp, rating, review, parkObj } = this.props;
    const { parkName, photoReference, parkId } = parkObj;

    return (
      <li className="user-review">
        <Link to={`/parks/${parkId}`}>
          <h4>{parkName}</h4>
          <img src={getParkImage(photoReference, 500)} alt={parkName}/>
        </Link>
        <p>{timeStamp}</p>
        <p>{rating}</p>
        <p>{review}</p>
      </li>
    );
  }
}

export default connect(
  null
)(Review);

