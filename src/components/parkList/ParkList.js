import React, { Component } from 'react';
import { connect } from 'react-redux';
import Park from './Park';

class ParkList extends Component {

  render() {

    const { results } = this.props;
    return (
      <ul>
        {results.map(result => <Park key={result.id} result={result} />)}
      </ul>
    );
  }
}

export default connect(
  state => ({ results: state.searchResults }),
  null
)(ParkList);