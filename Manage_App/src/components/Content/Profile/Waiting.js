import React, { Component } from 'react';
import './Waiting.css';
import user_profile from '../../../images/user_profile.png';

export default class Waiting extends Component {
  render() {
    const {phone , address} = this.props;
    return (
      <a href="#user" className="list-group-item list-group-item-action list-group-item-light">
        <img src={user_profile} alt="" />
        <div className="wrapper_profile">
          <h6>{phone}</h6>
          <p>{address}</p>
        </div>
      </a>
    );
  }
}