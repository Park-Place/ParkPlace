import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class UserDetail extends Component {

  render() {

    const { loggedIn } = this.props;
    console.log(loggedIn);
     // image, location, username
    return (
      <section className="user">
        <div className="nav">
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/UserDetail">User(test)</Link></li>
            <li><Link to="/Park">Park(test)</Link></li>
          </ul>
        </div>
        <div className="user-info">
          <img src="#" alt="#"/>
          {/* <h4>{loggedIn.userName}</h4> */}
          {/* <h4>{loggedIn.location}</h4> */}
        </div>
        <div>
        </div>
      </section>
    );
  }
}

export default connect(
  state => ({ loggedIn: state.loggedIn }),
  null
)(UserDetail);