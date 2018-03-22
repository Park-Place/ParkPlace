import React, { Component } from 'react';
import { connect } from 'react-redux';
import Review from './Review';

class Reviews extends Component {

  render() {

    const { reviews } = this.props;

    if(!reviews) return (<p>There are no reviews yet</p>);

    const reviewsArr = Object.keys(reviews);

    return (
      <ul>
        {reviewsArr.map(key => <Review key={key} {...reviews[key]}/>)}
      </ul>
    );
  }
}

export default connect(
  state => ({ reviews: state.currentParkReviews }),
  null
)(Reviews);