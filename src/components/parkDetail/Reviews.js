import React, { Component } from 'react';
import { connect } from 'react-redux';
import Review from './Review';
import './review.css';


class Reviews extends Component {

  render() {

    const { reviewIds } = this.props;

    if(!reviewIds) return null;
    const reviewIdsArr = Object.keys(reviewIds);
    if(reviewIdsArr.length < 1) return (<p>There are no reviews yet.</p>);

    return (
      <ul className="reviews">
        {reviewIdsArr.map(reviewId => <Review key={reviewId} reviewId={reviewId}/>)}
      </ul>
    );
  }
}

export default connect(
  state => ({ reviewIds: state.currentParkReviews }),
  null
)(Reviews);