import React, { Component } from 'react';
import './actionButton.css';

export default class ActionButton extends Component {

  render() {
    const { onClick, buttonText, type, disabled, classData } = this.props;
    return (
      <button className={`${classData} action-button`} type={type} onClick={onClick} disabled={disabled}>{buttonText}</button>
    );
  }
}