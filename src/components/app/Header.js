import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class Header extends Component {

  render() {

    return (
      <div>
        <Link to="/"><h1>ParkPlace</h1></Link>
      </div>
    );
  }
}

export default connect(
  null
)(Header);