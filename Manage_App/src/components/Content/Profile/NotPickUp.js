import React, { Component } from 'react';
import './NotPickUp.css';
import user_profile from '../../../images/user_profile.png';

export default class NotPickUp extends Component {
  render() {
    const {phone , address} = this.props;
    return (
      <a href="#user" className="list-group-item list-group-item-action list-group-item-info list_notpickup">
        <img src={user_profile} alt="" />
        <div className="wrapper_profile">
          <h6>{phone}</h6>
          <p>{address}</p>
        </div>
      </a>
    );
  }
}