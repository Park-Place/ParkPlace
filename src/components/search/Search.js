import React, { Component, Fragment } from 'react';
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
          <Button className={'Keyword' === currentForm ? 'active' : ''} type="button" onClick={event => this.handleFormChange(event)} name="Keyword" >keyword</Button>

          <Button className={'Location' === currentForm ? 'active' : ''} id="location" type="button" onClick={event => this.handleFormChange(event)} name="Location" >location</Button>
        </div>
        <fieldset>
          { currentForm === 'Keyword' && <SearchForm label="Keyword" value={keyword} placeholder="Name of Park" onChange={this.handleInputChange}/> }
          { currentForm === 'Location' && <SearchForm label="Location" value={location} placeholder="City" onChange={this.handleInputChange}/> }
          <ActionButton classData={'search-form-button'}id="search" type={'submit'} buttonText={'Search'} disabled={false}/>
        </fieldset>
      </Form>
    );
  }
}

const SearchForm = ({ label, value, placeholder, onChange }) => {
  const name = label.toLowerCase();
  return (
    <Fragment>
      <ControlLabel htmlFor={name} className="clip">{label}:</ControlLabel>
      <FormControl name={name} id={name} placeholder={placeholder} value={value} onChange={onChange}/>
    </Fragment>
  );
};

export default withRouter(Search);