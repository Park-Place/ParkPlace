import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { searchByKeyword, searchByLocation } from './actions';
import { withRouter } from 'react-router-dom';


class Search extends Component {

  state = {
    currentForm: 'Keyword',
    keyword: '',
    location: ''
  };

  handleFormChange = (event) => {
    event.preventDefault();
    this.setState({ currentForm: event.target.name });
  };

  handleSubmit = (event) => {
    event.preventDefault();    
    const { currentForm, keyword, location } = this.state;
    const { searchByKeyword, searchByLocation } = this.props;

    event.preventDefault();
    if(currentForm === 'Keyword') searchByKeyword(keyword).then(() => this.props.history.push('/searchResults'));
    if(currentForm === 'Location') searchByLocation(location).then(() => this.props.history.push('/searchResults'));
  };

  handleChange = ({ target }) => {
    this.setState({ [target.name]: target.value });
  };

  render() {

    const { currentForm, location, keyword } = this.state;
    
    return (
      <form onSubmit={this.handleSubmit}>
        <button type="button" onClick={event => this.handleFormChange(event)} name="Keyword" >By keyword</button>
        <button type="button"onClick={event => this.handleFormChange(event)} name="Location" >By location</button>
        <fieldset>
          { (currentForm === 'Keyword') && 
            <Fragment>
              <label htmlFor="keyword" className="clip">Keyword:</label>
              <input name="keyword" placeholder="name of park" value={keyword} onChange={this.handleChange}/>
            </Fragment>
          }

          { (currentForm === 'Location') && 
            <Fragment>
              <label htmlFor="location" className="clip">Location:</label>
              <input name="location" placeholder="City" onChange={this.handleChange} value={location}/>
            </Fragment>
          }
        </fieldset>
        <button type="submit">Search</button>
      </form>
    );
  }
}

export default withRouter(connect(
  null,
  ({ searchByKeyword, searchByLocation })
)(Search));