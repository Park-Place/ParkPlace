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

  componentWillReceiveProps(nextProps) {
    const { id, loadUser } = this.props;
    const nextId = nextProps.match.params.id;
    if(nextId !== id) loadUser(nextId); //to check if user clicked on their own page directly from another users page
  }

  render() {

    const { currentUser } = this.props;
    
    if(!currentUser) return null;
    
    const { userName, location, image, reviews } = this.props.currentUser;
    
    
    return (
      <div className="user">
        <figure className="user_info">
          <h1>{userName}</h1>
          <h3>{location}</h3>
          <img src={image}/>
        </figure>

        <section className="user-review-list">
          <h4 className="user-review-title">Reviews:</h4>
          <Reviews reviewIds={reviews}/>
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