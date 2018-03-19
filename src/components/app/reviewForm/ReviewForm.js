import React, { Component } from 'react';
import { connect } from 'react-redux';
import { userReview } from './actions';

class ReviewForm extends Component {

//   handleEmailChange: function(e) {
//     this.setState({email: e.target.value});
//  },
//  handlePasswordChange: function(e) {
//     this.setState({password: e.target.value});
//  },
//  render : function() {
//        return (
//          <form>
//            <input type="text" name="email" placeholder="Email" value={this.state.email} onChange={this.handleEmailChange} />
//            <input type="password" name="password" placeholder="Password" value={this.state.password} onChange={this.handlePasswordChange}/>
//            <button type="button" onClick={this.handleLogin}>Login</button>
//          </form>);
//  },
//  handleLogin: function() {
//      console.log("EMail: " + this.state.email);
//      console.log("Password: " + this.state.password);
//  }

  // handleReviewChange(event) {
  //   event.preventDefault();
  //   console.log(event.target.value);
  //   this.setState({ review: event.target.value });
  // }

  handleFormData(event) {
    event.preventDefault();
    const sendReview = {
      review: event.target.review.value,
      parkType: event.target.parkType.value,
      rating: event.target.rating.value,
      parking: event.target.parking.value,
      timeOfYear: event.target.timeOfYear.value
    };
    console.log(sendReview);
    this.props.userReview(sendReview);
  }

  render() {

    return (
      <div>
        Add a review!
        <form onSubmit={(event) => this.handleFormData(event)}>
          <ul>
            <li><input id="review" htmlFor="review" placeholder="How was your visit?"/></li>
            <li><input id="parkType" htmlFor="type-of-park" placeholder="Who visits this park?"/></li>
            <h6>Rating:</h6>
            <select id="rating">
              Rating:
              <option value="Excellent">Excellent</option>
              <option value="Good">Good</option>
              <option value="Bad">Bad</option>
              <option value="Awful">Awful</option>
            </select>
            <h6>Parking:</h6>
            <select id="parking">
              Parking:
              <option value="Excellent">Excellent</option>
              <option value="Good">Good</option>
              <option value="Bad">Bad</option>
              <option value="Awful">Awful</option>
            </select>
            <h6>Time of year visited</h6>
            <select id="timeOfYear">
              <option value="Spring">Spring</option>
              <option value="Summer">Summer</option>
              <option value="Winter">Winter</option>
              <option value="Autumn">Autumn</option>
            </select>
          </ul>
          <button type="submit">Submit</button>
        </form>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    review: state.reviews.review,
    parkType: state.reviews.parkType,
    rating: state.reviews.rating,
    parking: state.reviews.parking,
    timeOfYear: state.reviews.timeOfYear
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
)(ReviewForm);