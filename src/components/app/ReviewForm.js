import React, { Component } from 'react';
import { connect } from 'react-redux';

class ReviewForm extends Component {

  render() {

    return (
      <div>
        Add a review!
        <form>
          <ul>
            <li><input placeholder="test input"/></li>
            <li><input placeholder="test input"/></li>
            <li><input placeholder="test input"/></li>
            <li><input placeholder="test input"/></li>
            <li><input placeholder="test input"/></li>
          </ul>
        </form>
      </div>
    );
  }
}

export default connect(
  null
)(ReviewForm);