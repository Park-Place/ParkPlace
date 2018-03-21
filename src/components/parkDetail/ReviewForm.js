import React, { Component } from 'react';
import { connect } from 'react-redux';

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

  render() {

    const { review, tags, amenities, rating } = this.state;

    return (
      <form className="review-form">
        <legend>Write a Review</legend>

        <label htmlFor="review"> Review:
        <textarea name="review" onChange={this.handleChange} value={review} required/>
        </label>

        <label htmlFor="tags" > Tags:
        <input name="tags" onChange={this.handleChange} value={tags} placeholder="hikable, views, dog-friendly..."/>
        </label>

        <label htmlFor="amenities"> Amenities:
        <input name="amenities" onChange={this.handleChange} value={amenities} placeholder="parking, bathrooms, water fountains..."/>
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
)(ReviewForm);