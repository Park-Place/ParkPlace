import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { searchByKeyword, searchByLocation } from '../search/actions';
import qs from 'query-string';
import Park from './Park';
import './park.css';

class ParkList extends Component {

  componentDidMount() {
    this.runSearch(this.props.location.search);
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.location.search != this.props.location.search) this.runSearch(nextProps.location.search);
  }

  runSearch(queryString) {
    const { searchByKeyword, searchByLocation } = this.props;
    const { type, search } = qs.parse(queryString);

    const action = type === 'Keyword' ? searchByKeyword : searchByLocation;
    action(search);

  }

  render() {
    const { results } = this.props;
    if(!results) return null;
    if(results.length === 0) return (<p>No results, try refining your search.</p>);

    return (
      <Fragment>
        <ul id="search-list">
          {results.map(result => <Park key={result.id} result={result} />)}
        </ul>
      </Fragment>
    );
  }
}

export default connect(
  state => ({ results: state.searchResults }),
  ({ searchByKeyword, searchByLocation })
)(ParkList);