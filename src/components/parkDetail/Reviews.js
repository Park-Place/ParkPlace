import React, { Component } from 'react';
import { connect } from 'react-redux';
import Review from './Review';
import './review.css';


class Reviews extends Component {

  render() {

    const { reviews } = this.props;

    if(!reviews) return (<p>There are no reviews yet</p>);

    const keys = Object.keys(reviews);

    return (
      <ul className="reviews">
        {keys.map(key => <Review key={key} {...reviews[key]}/>)}
      </ul>
    );
  }
}

export default connect(
  state => ({ reviews: state.currentParkReviews }),
  null
)(Reviews);