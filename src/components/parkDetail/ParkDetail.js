import React, { Component } from 'react';
import { getParkById } from './actions';
import { connect } from 'react-redux';
import { getParkImage } from '../../services/googleAPI';
import { Link } from 'react-router-dom';
import Reviews from './Reviews';
import Search from '../search/Search';
import Header from '../app/header/Header';
import { userReview } from '../reviewForm/actions';

export class ParkDetail extends Component {

  componentDidMount(){
    
    const { id } = this.props;
    console.log('id', id);
    this.props.getParkById(id);
  }



  render() {
    
    // console.log('result', this.props.result);
    if(!this.props.result) return null;
    
    const { name, formatted_address, international_phone_number, photos, rating } = this.props.result;
    const { weekday_text } = this.props.result.opening_hours;
    console.log('formatted add', formatted_address);
    console.log('weekday', weekday_text);

    return (
      <div className="park-details">
        {/* {check} */}
        <div className="splash-photo">
          <img src={getParkImage(photos[0].photo_reference, 500)} alt={name}/>
        </div>
        <div>
          <p>Name: {name}</p>
          <p>Rating: {rating}</p>
          <p>Address!: {formatted_address}</p>
          <p>Phone: {international_phone_number}</p>
          <p> { weekday_text.map((weekday, i) => <li key={i}>{weekday}</li>)}</p>
        </div>
        <div>
        </div>

        <div className="tags">
            Top tags
          <ul className="tag-list">
            <li>good</li>
            <li>bad</li>
          </ul>
        </div>
        {/* <div className="photos">
          <ul className="photos-list">
            <li><img src="#" alt="#"/></li>
            <li><img src="#" alt="#"/></li>
            <li><img src="#" alt="#"/></li>
            <li><img src="#" alt="#"/></li>
          </ul>
        </div> */}
        <div className="park-reviews">
          <h4>Reviews:</h4>
          <Reviews/>
        </div>
        <button id="add-review"><Link to="/ReviewForm">Review Park</Link></button>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    results: state.results
  };
}

function mapDispatchToProps(dispatch) {
  return {
    userReview() {
      dispatch(userReview());
    }
  };
}

export default connect(
  (state, props) => ({
    id: props.match.params.id,
    result: state.detailResult.result
    //current park: data that call brings
  }),
  ({ getParkById })
  //bring in detail action
)(ParkDetail);