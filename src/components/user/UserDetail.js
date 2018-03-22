import React, { Component } from 'react';
import { loadUser } from './actions';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class UserDetail extends Component {

  componentDidMount(){
    const { id } = this.props;
    this.props.loadUser(id);
  }

  render() {

    const { currentUser } = this.props;
    
    console.log(currentUser.name);

    return (
      <section className="main">
        <section classNme="user_info">
          <p> I AM USER DETAIL COMPONENT</p>
          {/* <p>Name: {name}</p>
          <p>Location: {location}</p>
          <img src={user_image}/> */}
          
        </section>
        <section className="user-review-list">
          <ul>
            {/* <Review> */}
          </ul>
        </section>
      </section>
    );
  }
}


export default connect(
  ({ currentUser }, { match }) => ({
    id: match.params.id,
    currentUser: currentUser
  }),
  ({ loadUser })
)(UserDetail);