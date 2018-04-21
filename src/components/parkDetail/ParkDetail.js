import React, { Component } from 'react';
import { getParkById, loadReviews, setParkDerivedData } from './actions';
import { connect } from 'react-redux';
import { getParkImage } from '../../services/googleAPI';
import { Link } from 'react-router-dom';
import ActionButton from '../actionButton/ActionButton';
import Reviews from './Reviews';
import ReactModal from 'react-modal';
import ReviewForm from './ReviewForm';
import './parkDetail.css';

export class ParkDetail extends Component {

  state = {
    open: false
  };

  customStyles = {
    content : {
      top: '50%',
      left: '50%',
      right: '2rem',
      bottom: '2rem',
      height: '650px',
      marginRight: '2rem',
      transform: 'translate(-50%, -50%)',
      position: 'relative'
    }
  };

  componentDidMount(){
    const { id } = this.props;
    this.props.getParkById(id);
    this.props.loadReviews(id);
    this.props.setParkDerivedData(id);
  }

  componentWillMount() {
    ReactModal.setAppElement('body');
  }

  handleClose = () => {
    this.setState({ open: false });
  };

  handleOpen = () => {
    this.setState({ open: true });
  };

  render() {
    
    if(!this.props.result) return null;
    
    const { name, formatted_address, international_phone_number, photos, opening_hours, url } = this.props.result;
    const { open } = this.state;
    const { hasReviewed, derivedData, loggedIn, id } = this.props;
    const reviewObj = {
      parkName: name,
      parkId: id,
      photoReference: photos[0].photo_reference
    };
  
    let tags, amenities, averageRating;
    if(derivedData) {
      tags = (derivedData.tags[0] === 'empty' && derivedData.tags.length === 1) ? null : derivedData.tags ;
      amenities = (derivedData.amenities[0] === 'empty' && derivedData.amenities.length === 1) ? null : derivedData.amenities;
      averageRating = derivedData.averageRating;
    }

    return (
      <div className="park-details">

        <div className="top-half">
          <div className="protective">
            <figure className="splash-photo">
              <img id="park-detail-pic" src={getParkImage(photos[0].photo_reference, 2000)} alt={name}/>
              <h2>{name}</h2>
              <p>Average Rating: {averageRating ? averageRating : 'No Reviews'}</p>
            </figure>
          </div>

          <div className="park-info">
            <div className="align">
              <div className="contact">
                <address>{formatted_address}</address>
                {international_phone_number && <p>Phone: {international_phone_number}</p>}
                <Link to={url} target="_blank" rel="noopener noreferrer"><span className="fa fa-external-link"></span> Directions</Link>
              </div>

              { opening_hours && 
              <ul className="hours">Hours: 
              {opening_hours.weekday_text.map((weekday, i) => <li key={i}>{weekday}</li>)}
              </ul>
              }
            </div>


            <div className="tags-reviews">
              {tags && 
                <ul className="tag-list">Tags:
                {tags.map(key => <li key={key}>{key}</li>)}
                </ul>
              }

              {amenities && 
                <ul className="tag-list">Amenities: 
                {amenities.map(key => <li key={key}>{key}</li>)}
                </ul>
              }
            </div>

          </div>

        </div>
        <div className="park-reviews">
          <h4 className="review-title">Reviews:</h4>
          <Reviews/>
        </div>

        {loggedIn && <ActionButton classData={'review-add-button'}onClick={this.handleOpen} disabled={hasReviewed} type={'button'} buttonText={'Add Review'}/>}

        <ReactModal
          isOpen={open}
          style={this.customStyles}
          onRequestClose={this.handleClose}
        >
          <button className="modal-button" onClick={this.handleClose}>x</button>
          <ReviewForm reviewObj={reviewObj} legendText={'Write a Review'} handleClose={this.handleClose}/>
        </ReactModal>

      </div>
    );
  }
}

const checkReviewed = (reviews, loggedIn) => {
  if(loggedIn) return Object.keys(reviews).some(reviewId => loggedIn.reviews[reviewId]); 
  else return false;
};

export default connect(
  ({ currentPark, currentParkReviews, currentParkDerivedData, loggedIn }, { match }) => ({
    id: match.params.id,
    result: currentPark,
    reviews: currentParkReviews,
    hasReviewed: !!currentParkReviews && checkReviewed(currentParkReviews, loggedIn),
    derivedData: currentParkDerivedData,
    loggedIn
  }),
  ({ getParkById, loadReviews, setParkDerivedData })
)(ParkDetail);