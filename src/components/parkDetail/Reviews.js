import React, { Component } from 'react';
import { connect } from 'react-redux';
import Review from './Review';
import './review.css';


class Reviews extends Component {

  render() {

    const { reviews } = this.props;

    if(!reviews) return null;
    if(reviews.length === 0) return (<p>There are no reviews yet</p>);

    return (
      <ul className="reviews">
        {reviews.map(review => <Review key={review.userId} {...review}/>)}
      </ul>
    );
  }
}

export default connect(
  state => ({ reviews: state.currentParkReviews }),
  null
)(Reviews);