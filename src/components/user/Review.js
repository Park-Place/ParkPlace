import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { getParkImage } from '../../services/googleAPI';
import ReviewForm from '../parkDetail/ReviewForm';
import { auth } from '../../services/firebase';

class Review extends Component {

  state = {
    editing: false
  };

  changeEditing = () => {
    this.setState(prev => ({ editing: !prev.editing }));
  };

  render() {
    const { userObj, timeStamp, rating, review, parkObj, amenities, tags } = this.props;
    const { parkName, photoReference, parkId } = parkObj;
    const { userId } = userObj;
    const { editing } = this.state;

    const uid = auth.currentUser ? auth.currentUser.uid : null;

    const reviewObj = {
      rating,
      amenities: amenities.join(' '),
      tags: tags.join(' '),
      review
    };

    return (
      <li className="park-review">
        <Link to={`/parks/${parkId}`} className="user-content">
          <img src={getParkImage(photoReference, 500)} alt={parkName}/>
          <h4>{parkName}</h4>
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
            <ReviewForm legendText={'Edit Your Review'} reviewObj={reviewObj} priorReview={true} 
              handleClose={this.changeEditing} parkReviewed={parkObj}/>
          }
        </div>
      </li>
    );
  }
}

export default connect(
  null
)(Review);

