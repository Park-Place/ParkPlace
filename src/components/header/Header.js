import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { ClipLoader } from 'react-spinners';
import { logout } from '../auth/actions';
import { Navbar } from 'react-bootstrap';
import { withRouter } from 'react-router-dom';
import { auth } from '../../services/firebase';
import svg from '../assets/logo.svg';
import Error from '../app/Error';
import Search from '../search/Search';
import './header.css';

class Header extends Component {

  handleLogOut = (event) => {
    event.preventDefault();
    this.props.logout();
  };

  render() {

    const { loading, error, user, checkedUser, location } = this.props;

    const uid = auth.currentUser ? auth.currentUser.uid : null;
    
    if(location.pathname === '/home') return null;
    if(!checkedUser) return null;

    return (
      <header id="header">
        <div className="top-header">
          <Link to="/home"><h1>Park <img className="logo" src={svg}/> Place</h1></Link>
          <div className="user-header">
            {user && <h3><Link to={`/users/${uid}`}><img  src={user.image} alt={user.userName}/><span className="userName">{user.userName}</span></Link></h3>}
            <ul className="user-links">
              {
                user
                  ? <li><a href='#' onClick={this.handleLogOut}>Log out</a></li>
                  : 
                  <Fragment>
                    <li><Link to={{ 
                      pathname: '/auth/signin', 
                      state: { from: location } 
                    }}>Sign In</Link></li>
                    <li><Link to={{ 
                      pathname: '/auth/signup', 
                      state: { from: location } 
                    }}>Sign Up</Link></li>
                  </Fragment>
              }
            </ul>
          </div>
        </div>

        {error && <Error error={error}/>}

        <div className="loader">
          <ClipLoader size={65} loading={loading}/>
        </div>
        <Search classData={'header-search'}/>
      </header>
    );
  }
}

export default withRouter(connect(
  (state) => ({ 
    loading: state.loading, 
    error: state.error, 
    user: state.loggedIn, 
    checkedUser: state.checkedUser
  }),
  ({ logout })
)(Header));