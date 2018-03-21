import React, { Component } from 'react';
import { connect } from 'react-redux';
import Review from './Review';

class Reviews extends Component {

  render() {

    const { reviews } = this.props;

    if(!reviews) return null;

    const reviewsArr = Object.keys(reviews);

    console.log(reviewsArr);

    return (
      <ul>
        {reviews.map(review => <Review key={review.userObj.userId} {...review}/>)}
      </ul>
    );
  }
}

export default connect(
  state => ({ reviews: state.currentParkReviews }),
  null
)(Reviews);