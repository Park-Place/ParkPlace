import React, { Component } from 'react';

export default class ActionButton extends Component {

  render() {
    const { onClick, buttonText, type } = this.props;
    return (
      <button type={type} onClick={onClick}>{buttonText}</button>
    );
  }
}
