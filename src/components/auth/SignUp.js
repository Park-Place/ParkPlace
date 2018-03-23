import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { signup } from './actions';
import blankImage from '../assets/default.png';
import { Form, Button, ControlLabel, FormControl } from 'react-bootstrap';
import ActionButton from '../actionButton/ActionButton';
import './auth.css';



class SignUp extends PureComponent {

  state = {
    error: null,
    image: blankImage,
    disable: false
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const { elements } = event.target;
    const { history, location } = this.props;

    const credentials = {
      email: elements.email.value,
      password: elements.password.value,
      image: elements.image.files[0],
      location: elements.location.value,
      userName: elements.username.value
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

  handleUpload = ({ target }) => {
    const reader = new FileReader();

    reader.readAsDataURL(target.files[0]);

    reader.onload = () => {
      this.setState({ image: reader.result, disable: true });
    };
  };

  handleImageRemove = () => {
    this.setState({ image: blankImage, disable: false });
    this.pictureInput.value = ''; //clears file 
  };

  render() {
    const { error, image, disable } = this.state;
    const { buttonText, legendText } = this.props;

    return (

      <Form className="user-form" onSubmit={this.handleSubmit}>
        <legend>{legendText}</legend>
        <ControlLabel htmlFor="email"> Email:
        <FormControl name="email" required/>
        </ControlLabel>

        <ControlLabel htmlFor="password" > Password:
        <FormControl name="password" type="password" required/>
        </ControlLabel>

        <ControlLabel htmlFor="username"> Username: 
        <FormControl name="username" required/>
        </ControlLabel>

        <ControlLabel htmlFor="location"> Location: 
        <FormControl name="location"/>
        </ControlLabel>
        <div className="picture-add">
          <ControlLabel htmlFor="image"> Add Profile Picture:
          <input ref={(input) => { this.pictureInput = input; }} type="file" name="image" onChange={this.handleUpload} disabled={disable}/>
          </ControlLabel>

          <figure>
            { (image !== blankImage) && <button type="button" onClick={this.handleImageRemove}>x</button> }
            <img className="preview" src={image}/>
          </figure>
        </div>

        <ActionButton classData={'form-button'} type={'submit'} buttonText={buttonText}/>
        <pre style={{ color: 'red' }}>
          {error && error.message}
        </pre>
      </Form>
    );
  }
}

export default connect(
  () => ({ 
    buttonText: 'Create Account',
    legendText: 'Sign Up' 
  }),
  { onSubmit: signup }
)(SignUp);
