import React, { Component } from 'react';
import { connect } from 'react-redux';
import Review from './Review';

class Reviews extends Component {

  render() {

    const { reviews } = this.props.currentUser;
    // console.log(reviews);
    
    if(!reviews) return null;

    const reviewsArr = Object.keys(reviews);

    return (
      <ul>
        {reviewsArr.map(key => <Review key={key} {...reviews[key]}/>)}
      </ul>
    );
  }
}

export default connect(
  state => ({ currentUser: state.currentUser }),
  null
)(Reviews);