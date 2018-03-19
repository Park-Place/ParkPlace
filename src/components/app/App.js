import React, { Component } from 'react';
import './app.css';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import UserDetail from './UserDetail';
import Home from './Home';
import ParkDetail from './ParkDetail';
import ReviewForm from './ReviewForm';


class App extends Component {

  state = {

  };

  render() {
    
    return (
      <div id="container">
        <header id="header">
          <h1>ParkPlace</h1>
        </header>
        <Router>
          <main role="main">
            <Switch>
              <Route exact path="/" component={Home}/>
              <Route exact path="/User" component={UserDetail}/>
              <Route exact path="/Park" component={ParkDetail}/>
              <Route exact path="/ReviewForm" component={ReviewForm}/>
              <Redirect to="/"/>
            </Switch>
          </main>
        </Router>
      </div>
    );
  }
}

export default connect(
  null
)(App);