import React, { Component } from 'react';
import './app.css';

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
        </main>
        <footer id="footer" role="contentinfo">
          <ul>
            <li>
              <a href="https://github.com/Theartbug" target="_blank" rel="noopener noreferrer">
                <span className="fa fa-github fa-3x"></span>
                <span className="clip">Github</span>
              </a>
            </li>
            <li>
              <a href="https://www.linkedin.com/in/graceprovost/" target="_blank" rel="noopener noreferrer">
                <span className="fa fa-linkedin fa-3x"></span>
                <span className="clip">LinkedIn</span>
              </a>
            </li>
            <li>
              <a href="mailto:grace.g.provost@gmail.com">
                <span className="fa fa-envelope-square fa-3x"></span>
                <span className="clip">Email</span>
              </a>
            </li>
          </ul>
          <small>&copy; 2018 Grace Provost | Student Work</small>
        </footer>
      </div>
    );
  }
}