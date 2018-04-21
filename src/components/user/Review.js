import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { getParkImage } from '../../services/googleAPI';
import ReviewForm from '../parkDetail/ReviewForm';
import { onReview } from '../../services/parkApi';
import { auth } from '../../services/firebase';

export default class Review extends Component {

  state = {
    editing: false
  };

  componentDidMount() {

    onReview(this.props.id, 'reviewDetail', this.setTheState); //must pass in setState for listener, otherwise review will not update on edit
  }

  setTheState = (result) => {
    this.setState({ ...result });    
  };

  changeEditing = () => {
    this.setState(prev => ({ editing: !prev.editing }));
  };

  render() {
    const { editing, userId, timeStamp, rating, review, amenities, tags, key, parkName, parkId, photoReference } = this.state;
    // const { parkName, photoReference, parkId } = parkObj;

    if(!rating) return null;
  
    const uid = auth.currentUser ? auth.currentUser.uid : null;

    const reviewObj = {
      rating,
      amenities: (amenities[0] === 'empty' && amenities.length === 1) ? '' : amenities.join(' '),
      tags: (tags[0] === 'empty' && tags.length === 1) ? '' : tags.join(' '),
      review,
      key,
      parkName,
      parkId,
      userId,
      photoReference
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
              handleClose={this.changeEditing}/>
          }
        </div>
      </li>
    );
  }
}

