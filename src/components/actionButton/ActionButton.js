import React, { Component } from 'react';
import './actionButton.css';
import { Button } from 'react-bootstrap';

export default class ActionButton extends Component {

  render() {
    const { onClick, buttonText, type, disabled, classData } = this.props;
    return (
      <Button className={classData} id="action-button" type={type} onClick={onClick} disabled={disabled}>{buttonText}</Button>
    );
  }
}