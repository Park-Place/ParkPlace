import React, { Component } from 'react';
import './app.css';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import UserDetail from './UserDetail';
import Home from './Home';
import ReviewForm from '../reviewForm/ReviewForm';
import User from '../auth/User';
import ParkList from '../parkList/ParkList';
import Header from './header/Header';
import Search from '../search/Search';

class App extends Component {

  state = {

  };

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
              {/* <Route exact path="/Park" component={ParkDetail}/> */}
              <Route exact path="/ReviewForm" component={ReviewForm}/>
              <Route exact path="/User" component={User}/>
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