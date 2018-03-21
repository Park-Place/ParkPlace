import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getParkImage } from '../../services/googleAPI';
import { Link } from 'react-router-dom';
// import { ParkDetail } from '../parkDetail/ParkDetail';

export class Park extends Component {

  render() {

    const { result } = this.props;
    const { name, formatted_address, photos, vicinity, place_id } = result;
    

    if(!photos) return null;
    
    return (
      
      <Link to={`/parks/${place_id}`}>
        <li className="park">
          <img src={getParkImage(photos[0].photo_reference, 500)} alt={name}/>
          <div className="park-info">
            <h3>{name}</h3>
            <p>{formatted_address || vicinity}</p>
          </div>
        </li>
      </Link>
    );
  }
}

export default connect(
  state => ({ results: state.results  }),
  null
)(Park);