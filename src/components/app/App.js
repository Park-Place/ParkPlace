import React, { Component } from 'react';
import './app.css';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import UserDetail from './UserDetail';
import Home from './Home';
import ParkDetail from './ParkDetail';
import ReviewForm from './ReviewForm';
import Search from '../search/Search';
import User from '../auth/User';


class App extends Component {

  state = {

  };

  render() {
    
    return (
      <div id="container">
        <header id="header">
          <h1>ParkPlace</h1>
        </header>
        <main id="main" role="main">
          <Search/>
          <Router>
            <Switch>
              <Route exact path="/" component={Home}/>
              <Route exact path="/UserDetail" component={UserDetail}/>
              <Route exact path="/Park" component={ParkDetail}/>
              <Route exact path="/ReviewForm" component={ReviewForm}/>
              <Route exact path="/User" component={User}/>
              <Redirect to="/"/>
            </Switch>
          </Router>
        </main>
        <footer id="footer" role="contentinfo">
          <small>&copy; 2018 ParkPlace | Student Work</small>
        </footer>
      </div>
    );
  }
}

export default connect(
  null
)(App);