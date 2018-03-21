import React, { Component } from 'react';
import { connect } from 'react-redux';
import { auth } from '../../services/firebase';
import { submitReview } from './actions';

class ReviewForm extends Component {

  state = {
    review: '',
    tags: '',
    amenities: '',
    rating: 3
  };

  handleChange = ({ target }) => {
    this.setState({ [target.name]: target.value });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    submitReview(this.state, this.props.parkId, auth.currentUser.uid);
  };

  render() {

    const { review, tags, amenities, rating } = this.state;

    return (
      <form className="review-form" onSubmit={event => this.handleSubmit(event)}>
        <legend>Write a Review</legend>

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
  null
  // ({ submitReview })
)(ReviewForm);