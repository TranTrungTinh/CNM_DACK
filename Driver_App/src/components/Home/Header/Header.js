import React, { Component } from 'react';
import './Header.css';

// import office from '../../../images/office.jpg';

// components
import Status from '../Status/Status';
import SlideMenu from '../SlideMenu/SlideMenu';

export default class Header extends Component {
  render() {
    // const {name} = this.props;
    return (
      <div className="header" >
        <Status />

        <SlideMenu />
          
        
        {/* <div className="profile" >
          <div className="chip">
            <img src={profile} alt="Driver Person" />
            Tran Thanh Nhan
          </div>
          <a className="btn waves-effect waves-light btn-logout">
            LOG OUT
          </a>
        </div> */}
        
      </div>
      
    );
  }
}