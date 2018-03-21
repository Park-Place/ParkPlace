import React, { Component } from 'react';
import './actionButton.css';

export default class ActionButton extends Component {

  render() {
    const { onClick, buttonText, type } = this.props;
    return (
      <button type={type} onClick={onClick}>{buttonText}</button>
    );
  }
}
