import React, { Component } from 'react';
import './PickUp.css';

import user_profile from '../../../images/user_profile.png';
import taxi from '../../../images/taxi.png';

export default class PickUp extends Component {
  render() {
    return (
      <a href="#pickup" className="list-group-item list-group-item-action list-group-item-light ">
        <img src={user_profile} alt="" />
        <div className="wrapper_profile">
          <h6>0972258138</h6>
          <p>227 nguyen van cu phuong 12 quan 5 thanh pho ho chi minh</p>
        </div>
        <div className="wrapper_profile_driver">
          <img src={taxi} alt="" />
          <h6>Tran Thanh Nhan</h6>
        </div>
        
        <button type="button" className="btn btn-outline-danger btn-sm btn-show-direction" >Show Direction</button>
        
      </a>
    );
  }
}