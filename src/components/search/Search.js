import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { searchByKeyword, searchByLocation } from './actions';
import { withRouter } from 'react-router-dom';
import { Form, Button, ControlLabel, FormControl } from 'react-bootstrap';
import './search.css';

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
      <Form horizontal onSubmit={this.handleSubmit}>
        <div className="keyword-location">
          <Button className="search-type" type="button" onClick={event => this.handleFormChange(event)} name="Keyword" >By keyword</Button>
          <Button className="search-type" id="location" type="button"onClick={event => this.handleFormChange(event)} name="Location" >By location</Button>
        </div>
        <fieldset>
          { (currentForm === 'Keyword') && 
            <Fragment>
              <ControlLabel htmlFor="keyword" className="clip">Keyword:</ControlLabel>
              <FormControl name="keyword" placeholder="name of park" value={keyword} onChange={this.handleChange}/>
            </Fragment>
          }

          { (currentForm === 'Location') && 
            <Fragment>
              <ControlLabel htmlFor="location" className="clip">Location:</ControlLabel>
              <FormControl name="location" placeholder="City" onChange={this.handleChange} value={location}/>
            </Fragment>
          }
        </fieldset>
        <Button id="search" type="submit">Search</Button>
      </Form>
    );
  }
}

export default withRouter(connect(
  null,
  ({ searchByKeyword, searchByLocation })
)(Search));