import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { signin } from './actions';

class SignIn extends PureComponent {

  state = {
    error: null
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const { elements } = event.target;
    const { history, location } = this.props;

    const credentials = {
      email: elements.email.value,
      password: elements.password.value
    };

    const { from } = location.state || { from: { pathname: '/home' } };

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
 
    return (

      <form className="user-form" onSubmit={this.handleSubmit}>
        <legend>Sign In</legend>
        <label htmlFor="email"> Email:
        <input name="email" required/>
        </label>

        <label htmlFor="password" > Password:
        <input name="password" type="password" required/>
        </label>

        <button type="submit">Sign In</button>
        <pre style={{ color: 'red' }}>
          {error && error.message}
        </pre>
      </form>
    );
  }
}

export default connect(
  null,
  { onSubmit: signin }
)(SignIn);