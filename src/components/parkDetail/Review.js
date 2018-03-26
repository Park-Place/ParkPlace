import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { auth } from '../../services/firebase';
import ReviewForm from './ReviewForm';
import './review.css';

class Review extends Component {

  state = {
    editing: false
  };

  changeEditing = () => {
    this.setState(prev => ({ editing: !prev.editing }));
  };

  render() {
    const { userObj, timeStamp, rating, review, amenities, tags } = this.props;
    const { userId, image, userName } = userObj;
    const { editing } = this.state;

    const uid = auth.currentUser ? auth.currentUser.uid : null;

    // Would be better not to have 'empty' as a value.
    // Non-existant or null better check...
    const reviewObj = {
      rating,
      amenities: (amenities[0] === 'empty' && amenities.length === 1) ? '' : amenities.join(' '),
      tags: (tags[0] === 'empty' && tags.length === 1) ? '' : tags.join(' '),
      review
    };

    return (
      <li className="park-review">
        <Link to={`/users/${userId}`} className="user-content"> 
          <img src={image}/>
          <h4>{userName}</h4>
          <p className="rating">{rating}</p>
        </Link>
        <div className="editing-zone">
          {(uid === userId) && <button className="edit-button" onClick={this.changeEditing}>{editing ? 'x' : <span className="fa fa-pencil"></span>}</button>}
          {!editing && 
            <Fragment>
              <p>{timeStamp}</p>
              <p>{review}</p>
            </Fragment>
          }
          {editing &&
            <ReviewForm legendText={'Edit Your Review'} reviewObj={reviewObj} priorReview={true} handleClose={this.changeEditing}/>
          }
        </div>
      </li>
    );
  }
}

export default connect(
  null
)(Review);