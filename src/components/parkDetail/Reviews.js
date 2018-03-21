import React, { Component } from 'react';
import { connect } from 'react-redux';
import Review from './Review';

class Reviews extends Component {

  render() {

    return (
      <div>
        <ul>
          <li>
            <Review/>
          </li>
        </ul>
      </div>
    );
  }
}

export default connect(
  null
)(Reviews);