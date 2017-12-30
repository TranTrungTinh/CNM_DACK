import React, { Component } from 'react';
import './SlideMenu.css';
import {slide as Menu} from 'react-burger-menu';
import profile from '../../../images/driver.png';

export default class SlideMenu extends Component {
  render() {
    return (
      <div className="slide-menu" >
        <Menu width={ '50%' }>
          <div className="welcome">Welcome</div>
          <p className="name">Tran Thanh Nhan</p>
          <button className="btn waves-effect waves-light">LOG OUT</button>
        </Menu>
        <div className="slide-menu-title">DRIVER
          <span style={{color: "#e74c3c"}} >APP</span>
        </div>
        <img src={profile} alt=""/>
      </div>
    );
  }
}