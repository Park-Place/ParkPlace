import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Reviews from './Reviews';
import Search from '../search/Search';
import Header from './Header';
import { userReview } from '../reviewForm/actions';

class ParkDetail extends Component {

  render() {

    const something = (this.props.keyword)
      ? <p>{this.props.keyword[0].formattedAddress}</p>
      : null;

    return (
      <div>
        {something}
        <Header/>
        <ul className="nav">
          <li><Link to="Home">Home</Link></li>
          <li><Link to="/User">User(test)</Link></li>
          <li><Link to="/Park">Park(test)</Link></li>
        </ul>
        <Search/>
        <div className="park-info">
          {/* <h4>{something}</h4> */}
          <ul>
            Hours
            <li>Sunday:</li>
            <li>Monday:</li>
            <li>Tuesday:</li>
            <li>Wednesday:</li>
            <li>Thursday:</li>
            <li>Friday:</li>
            <li>Saturday:</li>
          </ul>
          <div className="tags">
            Top tags
            <ul className="tag-list">
              <li>good</li>
              <li>bad</li>
            </ul>
          </div>
          <div className="photos">
            <ul className="photos-list">
              <li><img src="#" alt="#"/></li>
              <li><img src="#" alt="#"/></li>
              <li><img src="#" alt="#"/></li>
              <li><img src="#" alt="#"/></li>
            </ul>
          </div>
          <div className="park-reviews">
            <h4>Reviews:</h4>
            <Reviews />
          </div>
          <button id="add-review"><Link to="/ReviewForm">Review Park</Link></button>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    keyword: state.keyword
  };
}

function mapDispatchToProps(dispatch) {
  return {
    userReview() {
      dispatch(userReview());
    }
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ParkDetail);