import React, { Component } from 'react';
import './app.css';
import Search from '../search/Search';

export default class App extends Component {

  state = {

  };

  render() {
    
    return (
      <div id="container">
        <header id="header">
          <h1></h1>
        </header>
        <main id="main" role="main">
        <Search/>
        </main>
        <footer id="footer" role="contentinfo">
          <small>&copy; 2018 ParkPlace | Student Work</small>
        </footer>
      </div>
    );
  }
}