import React, { Component } from 'react';
import './app.css';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import Header from './header/Header';
import Home from './Home';
import UserDetail from './UserDetail';
import ReviewForm from '../reviewForm/ReviewForm';
import User from '../auth/User';
import ParkList from '../parkList/ParkList';
import ParkDetail from '../parkDetail/ParkDetail';
import { Signin, Signup } from '../auth/User';
import Search from '../search/Search';

class App extends Component {

  render() {

    const { results } = this.props;
    
    return (
      <Router>
        <div id="container">
          <Header/>
          <main id="main" role="main">
            <Search/>
            {results && <ParkList/>}
            <Switch>
              <Route exact path="/" component={Home}/>
              <Route exact path="/UserDetail" component={UserDetail}/>
              <Route path="/parkDetail/:id" component={ParkDetail}/>

              <Route exact path="/ReviewForm" component={ReviewForm}/>
              <Route exact path="/User" component={User}/>
              <Route exact path="/auth/Signin" component={Signin}/>
              <Route exact path="/auth/Signup" component={Signup}/>
              <Redirect to="/"/>
            </Switch>
          </main>
          <footer id="footer" role="contentinfo">
            <small>&copy; 2018 ParkPlace | Student Work</small>
          </footer>
        </div>
      </Router>
    );
  }
}

export default connect(
  state => ({ results: state.searchResults }),
  null
)(App);