import React, { Component } from 'react';
import './Status.css';
import wifi from '../../../images/wifi.png';
import battery from '../../../images/battery.png';

export default class Status extends Component {
  render() {
    return (
      <div className="status" >
        <img src={wifi} alt="" />
        <div>12:30 AM</div>
        <img src={battery} alt="" />          
      </div>     
    );
  }
}