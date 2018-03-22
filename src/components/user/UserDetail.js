import React, { Component } from 'react';
import { loadUser } from './actions';
import { connect } from 'react-redux';
// import { Link } from 'react-router-dom';
import  Reviews from './Reviews';

class UserDetail extends Component {

  componentDidMount(){
    const { id, loadUser } = this.props;
    loadUser(id);
  }

  render() {

    const { currentUser } = this.props;
    
    if(!currentUser) return null;
    
    const { userName, location, image } = this.props.currentUser;
    
    
    return (
      <section className="main">
        <section className="user_info">
          <h1>Name: {userName}</h1>
          <h3>Location: {location}</h3>
          <img src={image}/>

        </section>
        <section className="user-review-list">
          <div>
            <Reviews/>
          </div>
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