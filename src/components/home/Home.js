import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ClipLoader } from 'react-spinners';
import svg from '../assets/logo-white.svg';
import './home.css';
import Search from '../search/Search';

class Home extends Component {

  render() {

    const { loading } = this.props;

    return (
      <div className='home'>
        <div id='home-header'>
          <h1>Park <img className="home-logo" src={svg}/> Place</h1>
        </div>
        <Search classData={'home-search'}/>
        <h3>A place to find parks and review them.</h3>
        <div className="loader">
          <ClipLoader size={65} loading={loading}/>
        </div>
      </div>
    );
  }
}

export default connect(
  state => ({ loading: state.loading })
)(Home);