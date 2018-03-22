import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Navbar } from 'react-bootstrap';
import svg from '../assets/aParkPlace.svg';
import './home.css';
import Search from '../search/Search';

class Home extends Component {

  render() {

    return (
      <Fragment>
        <Navbar inverse collapseOnSelect id='home-header'>
          <Navbar.Header>
            <Navbar.Brand>
              <div>
                <h1 id="landing-header">&nbsp;Park <img src={svg}/> Place</h1>
              </div>
            </Navbar.Brand>
          </Navbar.Header>
        </Navbar>
        <Search classData="search-home"/>
      </Fragment>
    );
  }
}

export default connect(
  null
)(Home);