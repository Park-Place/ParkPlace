import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import Park from './Park';
import './park.css';

class ParkList extends Component {

  render() {

    const { results } = this.props;
    return (
      <Fragment>
        <ul id="search-list">
          {/* <h2>Search Results:</h2> */}
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