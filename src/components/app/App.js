import React, { Component } from 'react';
import './app.css';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import Header from '../header/Header';
import { listenForUser } from '../auth/actions';
import UserDetail from '../user/UserDetail';
import Home from '../home/Home';
import ParkList from '../parkList/ParkList';
import SignIn from '../auth/SignIn';
import SignUp from '../auth/SignUp';
import ParkDetail from '../parkDetail/ParkDetail';

class App extends Component {

  componentDidMount() {
    this.props.listenForUser();
  }

  render() {

    return (
      <Router>
        <div id="container">
          <Header/>
          <main id="main" role="main">
            <Switch>
              <Route exact path="/home" component={Home}/>
              <Route exact path="/users/:id" component={UserDetail}/>
              <Route exact path="/searchResults" component={ParkList}/>
              <Route path="/parks/:id" component={ParkDetail}/>
              <Route exact path="/auth/Signin" component={SignIn}/>
              <Route exact path="/auth/Signup" component={SignUp}/>
              <Redirect to="/home"/>
            </Switch>
          </main>
        </div>
      </Router>
    );
  }
}

export default connect(
  state => ({ results: state.searchResults }),
  ({ listenForUser })
)(App);