import React, { Component } from 'react';
import { connect } from 'react-redux';

class Park extends Component {

  render() {

    const { result } = this.props;
    const { name, formatted_address } = result;

    return (
      <li className="park">
        <img src='' alt={name}/>
        <div className="park-info">
          <h3>{name}</h3>
          <p>{formatted_address}</p>
        </div>
      </li>
    );
  }
}

export default connect(
  state => ({ results: state.results }),
  null
)(Park);