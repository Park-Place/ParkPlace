import React, { Component } from 'react';
import { getParkById } from './actions';
import { connect } from 'react-redux';
import { getParkImage } from '../../services/googleAPI';
import { Link } from 'react-router-dom';
import Reviews from './Reviews';
import ReactModal from 'react-modal';

export class ParkDetail extends Component {

  state = {
    open: false
  };

  componentDidMount(){
    const { id } = this.props;
    this.props.getParkById(id);
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
    
    const { name, formatted_address, international_phone_number, photos, rating } = this.props.result;
    const { weekday_text } = this.props.result.opening_hours;
    const { open } = this.state;


    return (
      <div className="park-details">
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
        <div className="park-reviews">
          <h4>Reviews:</h4>
          <Reviews/>
        </div>
        <button onClick={this.handleOpen}>open modal</button>
        <ReactModal
          isOpen={open}
          onRequestClose={this.handleClose}
        >
          <button onClick={this.handleClose}>x</button>
          <p>test</p>
        </ReactModal>
        <button id="add-review"><Link to="/ReviewForm">Review Park</Link></button>
      </div>
    );
  }
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