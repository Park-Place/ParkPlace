import React, { Component } from 'react';
import { loadUser } from './actions';
import { connect } from 'react-redux';
import  Reviews from './Reviews';
import './userDetail.css';

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
      <div className="user">
        <figure className="user_info">
          <h1>{userName}</h1>
          <h3>{location}</h3>
          <img src={image}/>
        </figure>

        <section className="user-review-list">
          <h4 className="user-review-title">Reviews:</h4>
          <Reviews/>
        </section>
      </div>
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