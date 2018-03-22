import React, { Component } from 'react';
import { connect } from 'react-redux';
import { auth } from '../../services/firebase';
import { submitReview } from './actions';

class ReviewForm extends Component {

  state = {
    review: '',
    tags: '',
    amenities: '',
    rating: 3,
    ...this.props.reviewObj
  };

  handleChange = ({ target }) => {
    this.setState({ [target.name]: target.value });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const { handleClose, user, parkReviewed, priorReview, park } = this.props;
    console.log(this.props);

    const userObj = {
      userName: user.userName,
      image: user.image,
      userId: auth.currentUser.uid
    };

    const parkObj = {
      parkName: parkReviewed ? parkReviewed.parkName : park.name,
      parkId: parkReviewed ? parkReviewed.parkId : park.place_id,
      photoReference: parkReviewed ? parkReviewed.photoReference : park.photos[0].photo_reference
    };

    submitReview(this.state, parkObj, userObj, priorReview);
    handleClose();
  };

  render() {

    const { review, tags, amenities, rating } = this.state;
    const { legendText } = this.props;
    return (
      <form className='review-form' onSubmit={event => this.handleSubmit(event)}>
        <legend>{legendText}</legend>

        <label htmlFor="review"> Review:
        <textarea name="review" onChange={this.handleChange} value={review} required/>
        </label>

        <label htmlFor="tags" > Tags (separate by spaces):
        <input name="tags" onChange={this.handleChange} value={tags} placeholder="hikable views dog-friendly..."/>
        </label>

        <label htmlFor="amenities"> Amenities (separate by spaces):
        <input name="amenities" onChange={this.handleChange} value={amenities} placeholder="parking bathrooms water fountains..."/>
        </label>

        <label htmlFor="rating"> Rating:
        <input name="rating" onChange={this.handleChange} value={rating} type="range" min="1" max="5" required/>{rating}
        </label>

        <button type="submit">Submit</button>
      </form>
    );
  }
}

export default connect(
  state => ({ user: state.loggedIn, park: state.currentPark }),
  null
)(ReviewForm);