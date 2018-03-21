import React, { Component } from 'react';
import './app.css';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import Header from './header/Header';
import { listenForUser } from '../auth/actions';
import UserDetail from './UserDetail';
import Home from './Home';
import ReviewForm from '../reviewForm/ReviewForm';
import ParkList from '../parkList/ParkList';
import SignIn from '../auth/SignIn';
import SignUp from '../auth/SignUp';
import Search from '../search/Search';
import ParkDetail from '../parkDetail/ParkDetail';

class App extends Component {

  componentDidMount() {
    this.props.listenForUser();
  }

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
              <Route exact path="/UserDetail:id" component={UserDetail}/>
              <Route path="/parkDetail/:id" component={ParkDetail}/>
              <Route exact path="/ReviewForm" component={ReviewForm}/>
              <Route exact path="/auth/Signin" component={SignIn}/>
              <Route exact path="/auth/Signup" component={SignUp}/>
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
  ({ listenForUser })
)(App);