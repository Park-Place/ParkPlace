import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { ClipLoader } from 'react-spinners';
import svg from './ParkPlace.svg';
import './header.css';

class Header extends Component {

  render() {

    const { loading } = this.props;

    return (
      <header id="header">
        <Link to="/"><h1>Park <img src={svg}/> Place</h1></Link>
        <div className="loader">
          <ClipLoader size={65} loading={loading}/>
        </div>
      </header>
    );
  }
}

export default connect(
  state => ({ loading: state.loading }),
  null
)(Header);