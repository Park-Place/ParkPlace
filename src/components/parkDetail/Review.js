import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { auth } from '../../services/firebase';

class Review extends Component {

  state = {
    editing: false
  };

  changeEditing = () => {
    this.setState(prev => ({ editing: !prev.editing }));
  };

  render() {
    const { userObj, timeStamp, rating, review } = this.props;
    const { userId, image, userName } = userObj;
    const { editing } = this.state;

    const uid = auth.currentUser ? auth.currentUser.uid : null;

    return (
      <li className="park-review">
        <Link to={`/users/${userId}`}className="user-content"> 
          <img src={image}/>
          <h4>{userName}</h4>
        </Link>
        {(uid === userId) && <button onClick={this.changeEditing}>{editing ? 'x' : <span className="fa fa-pencil"></span>}</button>}
        {!editing && 
          <Fragment>
            <p>{timeStamp}</p>
            <p>{rating}</p>
            <p>{review}</p>
          </Fragment>
        }
      </li>
    );
  }
}

export default connect(
  // state => ({ reviews: state.reviews }),
  null
)(Review);