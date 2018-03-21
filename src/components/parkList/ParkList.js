import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import Park from './Park';
import './park.css';

class ParkList extends Component {

  render() {

    const { results } = this.props;
    return (
      <Fragment>
        <h2>Your Results:</h2>
        <ul>
          {results.map(result => <Park key={result.id} result={result} />)}
        </ul>
      </Fragment>
    );
  }
}

export default connect(
  state => ({ results: state.searchResults }),
  null
)(ParkList);