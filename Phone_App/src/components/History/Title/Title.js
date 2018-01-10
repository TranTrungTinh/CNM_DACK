import React, { Component } from 'react';
import './Title.css';
import notpickup from '../../../images/waiting_profile.png';
import complete from '../../../images/usercomplete.png';

export default class Title extends Component {
  render() {
    return (
      <div className="row box">
        <div className="col title">
          <img src={complete} alt="" className="image" />
          <p>Địa chỉ đã hoàn thành</p>
        </div>
        <div className="col title">
          <img src={notpickup} alt="" className="image" />
          <p>Địa chỉ không có xe nhận</p>
        </div>
      </div>
    );
  }
}