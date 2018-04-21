import React, { Component } from 'react';
import Review from './Review';

export default class Reviews extends Component {

  render() {

    const { reviewIds } = this.props;
    if(!reviewIds) return null;
    
    const reviewsArr = Object.keys(reviewIds);

    return (
      <ul className="reviews">
        {reviewsArr.map(id => <Review key={id} id={id}/>)}
      </ul>
    );
  }
}