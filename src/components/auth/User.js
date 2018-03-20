import React, { PureComponent, Fragment } from 'react';
import { connect } from 'react-redux';
import { signup, signin } from './actions';
import { Route } from 'react-router-dom';

class User extends PureComponent {

  state = {
    error: null
  };

  handleSubmit = event => {
    event.preventDefault();
    const { elements } = event.target;
    const { history, location } = this.props;

    const credentials = {
      email: elements.email.value,
      password: elements.password.value
    };

    const { from } = location.state || { from: { pathname: '/' } };
    
    this.props.onSubmit(credentials)
      .then(() => {
        setTimeout(() => {
          history.push(from); //allows firebase to send the auth token prior to page move!
        }, 100);
      })
      .catch(error => this.setState({ error }));
  };

  render() {
    const { error } = this.state;
    const { buttonText, legendText, username, location, picture } = this.props;

    return (

      <form className="player-form" onSubmit={this.handleSubmit}>
        <legend>{legendText}</legend>
        <label htmlFor="email"> Email:
        <input name="email" required/>
        </label>

        <label htmlFor="password" > Password:
        <input name="password" type="password" required/>
        </label>

        <Route path="/auth/signup" render={() => (
          <Fragment>
            <label htmlFor="username"> Username: 
            <input name="username" required/>
            </label>

            <label htmlFor="location"> Location: 
            <input name="location"/>
            </label>

            <label htmlFor="picture"> Profile picture: 
            <input name="picture"/>
            </label>
          </Fragment>
        )}/>
        <button>{buttonText}</button>
        <pre style={{ color: 'red' }}>
          {error && error.message}
        </pre>
      </form>
    );
  }
}

export const Signup = connect(
  () => ({ 
    buttonText: 'Create Account',
    legendText: 'Sign Up' 
  }),
  { onSubmit: signup }
)(User);

export const Signin = connect(
  () => ({ 
    buttonText: 'Sign In',
    legendText: 'Sign In'
  }),
  { onSubmit: signin }
)(User);