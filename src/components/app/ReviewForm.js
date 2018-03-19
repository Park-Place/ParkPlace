import React, { Component } from 'react';
import { connect } from 'react-redux';

class ReviewForm extends Component {

  handleFormData(){
    
  }

  render() {

    return (
      <div>
        Add a review!
        <form>
          <ul>
            <li><input htmlFor="review" placeholder="How was your visit?"/></li>
            <li><input htmlFor="type-of-park" placeholder="Who visits this park?"/></li>
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
            <select id="time-of-year">
              <option value="Spring">Spring</option>
              <option value="Summer">Summer</option>
              <option value="Winter">Winter</option>
              <option value="Autumn">Autumn</option>
            </select>
          </ul>
          <button type="submit" onSubmit={() => handleFormData()}>Submit</button>
        </form>
      </div>
    );
  }
}

export default connect(
  null
)(ReviewForm);