import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { signin } from './actions';
import { Form, FormControl, ControlLabel } from 'react-bootstrap';
import ActionButton from '../actionButton/ActionButton';
import './auth.css';


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

      <Form className="user-form" onSubmit={this.handleSubmit}>
        <legend>Sign In</legend>
        <ControlLabel htmlFor="email"> Email:
        <input name="email" required/>
        </ControlLabel>

        <ControlLabel htmlFor="password" > Password:
        <input name="password" type="password" required/>
        </ControlLabel>

        <ActionButton classData={'form-button'} type={'submit'} buttonText={'Sign In'}/>
        <pre style={{ color: 'red' }}>
          {error && error.message}
        </pre>
      </Form>
    );
  }
}

export default connect(
  null,
  { onSubmit: signin }
)(SignIn);