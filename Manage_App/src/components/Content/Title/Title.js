import React, { Component } from 'react';
import './Title.css';
// resource
import waiting from '../../../images/taxi_passanger.png';
import notpickup from '../../../images/waiting_profile.png';
import car from '../../../images/car_pickup.png';
import user_complete from '../../../images/usercomplete.png';

export default class Title extends Component {
  render() {
    return (
      <div className="row box">
        <div className="col title">
          <img src={waiting} alt="" className="image" />
          <p>Người dùng đang đợi xe</p>
        </div>
        <div className="col title">
          <img src={notpickup} alt="" className="image" />
          <p>Người dùng không có xe</p>
        </div>
        <div className="col title">
          <img src={car} alt="" className="image" />
          <p>Người dùng đã được xe đón</p>
        </div>
        <div className="col title">
          <img src={user_complete} alt="" className="image" />
          <p>Đã hoàn thành chuyến đi</p>
        </div>
      </div>
    );
  }
}