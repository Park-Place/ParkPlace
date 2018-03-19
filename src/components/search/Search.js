import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { searchByKeyword } from './actions';


class Search extends Component {

  state = {
    currentForm: 'Keyword'
  };

  handleFormChange = (event) => {
    event.preventDefault();
    this.setState({ currentForm: event.target.value });
  };

  handleSubmit = (event) => {
    event.preventDefault();    
    const { currentForm } = this.state;
    const { searchByKeyword } = this.props;

    event.preventDefault();
    if(currentForm === 'Keyword') searchByKeyword(event.target.elements.keyword.value);
    
    // if(currentForm === 'Location') searchByLocation(event.target.elements.location.value);
  };

  render() {

    const { currentForm } = this.state;
    
    return (
      <form onSubmit={this.handleSubmit}>
        <button type="button" onClick={event => this.handleFormChange(event)} value="Keyword">By keyword</button>
        <button type="button"onClick={event => this.handleFormChange(event)} value="Location">By location</button>
        <fieldset>
          { (currentForm === 'Keyword') && 
            <Fragment>
              <label htmlFor="keyword" className="clip">Keyword:</label>
              <input name="keyword" placeholder="name of park"/>
            </Fragment>
          }

          { (currentForm === 'Location') && 
            <Fragment>
              <label htmlFor="location" className="clip">Location:</label>
              <input name="location" placeholder="City"/>
            </Fragment>
          }
        </fieldset>
        <button type="submit">Search</button>
      </form>
    );
  }
}

export default connect(
  null,
  ({ searchByKeyword })
)(Search);