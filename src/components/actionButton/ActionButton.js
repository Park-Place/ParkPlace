import React, { Component } from 'react';
import './actionButton.css';

export default class ActionButton extends Component {

  render() {
    const { onClick, buttonText, type, disabled } = this.props;
    return (
      <button type={type} onClick={onClick} disabled={disabled}>{buttonText}</button>
    );
  }
}
