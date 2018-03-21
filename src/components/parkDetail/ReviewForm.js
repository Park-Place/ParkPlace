import React, { Component } from 'react';
import { connect } from 'react-redux';

class ReviewForm extends Component {

  render() {

    return (
      <form className="review-form">
        <legend>Write a Review</legend>

        <label htmlFor="review"> Review:
        <textarea name="review" required/>
        </label>

        <label htmlFor="tags"> Tags:
        <input name="tags" placeholder="hikable, views, dog-friendly..."/>
        </label>

        <label htmlFor="amenities"> Amenities:
        <input name="amenities" placeholder="parking, bathrooms, water fountains..."/>
        </label>

        <label htmlFor="rating"> Rating:
        <input name="rating" type="range" min="1" max="5" required/>
        </label>

        <button type="submit">Submit</button>
      </form>
    );
  }
}

export default connect(
  null
)(ReviewForm);