import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { ClipLoader } from 'react-spinners';
import { logout } from '../../auth/actions';
import svg from './ParkPlace.svg';
import Error from '../Error';
import Search from '../../search/Search';
import './header.css';

class Header extends Component {

  render() {

    const { loading, error, user, logout, checkedUser } = this.props;
    
    if(!checkedUser) return null;

    return (
      <header id="header">
        <Link to="/"><h1>Park <img src={svg}/> Place</h1></Link>
        <div className="user-header">
          {user && <h3><img src={user.image} alt={user.userName}/>{user.userName}</h3>}
          <ul className="user-links">
            {
              user
                ? <li><Link to="/game" onClick={logout}>Log out</Link></li>
                : 
                <Fragment>
                  <li><Link to="/auth/signin">Sign In</Link></li>
                  <li><Link to="/auth/signup">Sign Up</Link></li>
                </Fragment>
            }
          </ul>
        </div>

        {error && <Error error={error}/>}

        <div className="loader">
          <ClipLoader size={65} loading={loading}/>
        </div>
        <Search/>
      </header>
    );
  }
}

export default connect(
  state => ({ loading: state.loading, error: state.error, user: state.loggedIn, checkedUser: state.checkedUser }),
  ({ logout })
)(Header);