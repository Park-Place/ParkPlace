import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import qs from 'query-string';
import Park from './Park';
import './park.css';
import { searchByLocation } from '../search/actions';

class ParkList extends Component {

  componentDidMount() {
    console.log(this.props.location.search);
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.location.search != this.props.location.search) console.log(nextProps.location.search);
  }

  runSearch(queryString) {
    const {type, search} = qs.parse(queryString);
    // if(!type || !search) 

    const action = type === 'Keyword' ? searchByKeyword : searchByLocation;
    action(search);


    // if(currentForm === 'Keyword') searchByKeyword(keyword).then(() => this.props.history.push('/searchResults'));
    // if(currentForm === 'Location') searchByLocation(location).then(() => this.props.history.push('/searchResults'));
  }

  render() {
    const { results } = this.props;
    if(!results) return null;
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