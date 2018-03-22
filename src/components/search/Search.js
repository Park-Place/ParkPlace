import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { searchByKeyword, searchByLocation } from './actions';
import { withRouter } from 'react-router-dom';
import { Form, Button, ControlLabel, FormControl } from 'react-bootstrap';
import ActionButton from '../actionButton/ActionButton';
import qs from 'query-string';
import './search.css';


class Search extends Component {

  state = {
    currentForm: 'Keyword',
    keyword: '',
    location: ''
  };

  componentDidMount() {
    this.saveInput(this.props.location.search);
  }

  saveInput(queryString) {
    if(queryString === '') return;
    const { type, search } = qs.parse(queryString);

    const action = type === 'Keyword' ? 'keyword' : 'location';
    this.setState({ currentForm: type, [action]: search });
  }
  
  handleFormChange = (event) => {
    event.preventDefault();
    this.setState({ currentForm: event.target.name });
  };

  handleSubmit = (event) => {
    event.preventDefault();    
    const { currentForm, keyword, location } = this.state;

    event.preventDefault();

    this.props.history.push(`/searchResults?type=${currentForm}&search=${currentForm === 'Keyword' ? keyword : location}`);
  };

  handleInputChange = ({ target }) => {
    this.setState({ [target.name]: target.value });
  };

  render() {

    const { currentForm, location, keyword } = this.state;
    const { classData } = this.props;
    
    return (
      <Form className={`search-form ${classData}`} horizontal onSubmit={this.handleSubmit}>
        <div className="keyword-location">
          <Button className="search-type" type="button" onClick={event => this.handleFormChange(event)} name="Keyword" >By keyword</Button>
          <Button className="search-type" id="location" type="button" onClick={event => this.handleFormChange(event)} name="Location" >By location</Button>
        </div>
        <fieldset>
          { (currentForm === 'Keyword') && 
            <Fragment>
              <ControlLabel htmlFor="keyword" className="clip">Keyword:</ControlLabel>
              <FormControl name="keyword" placeholder="name of park" value={keyword} onChange={this.handleInputChange}/>
            </Fragment>
          }

          { (currentForm === 'Location') && 
            <Fragment>
              <ControlLabel htmlFor="location" className="clip">Location:</ControlLabel>
              <FormControl name="location" placeholder="City" onChange={this.handleInputChange} value={location}/>
            </Fragment>
          }
        </fieldset>
        <ActionButton id="search" type={'submit'} buttonText={'Search'} disabled={false}/>
      </Form>
    );
  }
}

export default withRouter(connect(
  null,
  ({ searchByKeyword, searchByLocation })
)(Search));