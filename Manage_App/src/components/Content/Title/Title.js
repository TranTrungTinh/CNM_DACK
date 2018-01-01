import React, { Component } from 'react';
import './Title.css';
import user from '../../../images/user_time.png';
import car from '../../../images/car_pickup.png';

export default class Title extends Component {
  render() {
    return (
      <div className="row box">
        <div className="col title">
          <img src={user} alt="" className="image" />
          <p>Users are waiting the car</p>
        </div>
        <div className="col title">
          <img src={car} alt="" className="image" />
          <p>Users have been already picked up</p>
        </div>
        <div className="col title">
          <img src={car} alt="" className="image" />
          <p>Users have been already picked up</p>
        </div>
      </div>
    );
  }
}