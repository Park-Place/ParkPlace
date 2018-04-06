import React, { Component } from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import { connect } from 'react-redux';
import { getParkImage } from '../../services/googleAPI';
import { Link } from 'react-router-dom';
import { Image } from 'react-bootstrap';
import './park.css';

export class Park extends Component {

  render() {

    const { result, index } = this.props;
    const { name, formatted_address, photos, vicinity, place_id } = result;
    
    if(!photos) return null;
    
    return (
      <ReactCSSTransitionGroup
        transitionName="slide-up"
        transitionAppear={true}
        transitionAppearTimeout={1800 + (index * .05)}
        transitionEnter={false}
        transitionLeave={false}>
        <Link className="park-link" to={`/parks/${place_id}`} style={{ 'transitionDelay': `${ index * .05 }s` }}>
          <li className="park">
            <Image src={getParkImage(photos[0].photo_reference, 500)} alt={name} rounded responsive/>
            <div className="park-info">
              <h3>{name}</h3>
              <p>{formatted_address || vicinity}</p>
            </div>
          </li>
        </Link>
      </ReactCSSTransitionGroup>
    );
  }
}

export default connect(
  state => ({ results: state.results  }),
  null
)(Park);