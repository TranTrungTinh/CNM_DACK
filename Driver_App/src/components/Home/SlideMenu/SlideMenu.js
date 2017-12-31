import React, { Component } from 'react';
import './SlideMenu.css';
import swal from 'sweetalert';
import {slide as Menu} from 'react-burger-menu';
import profile from '../../../images/driver.png';
import {connect} from 'react-redux';
import * as actionCreators from '../../../redux/actionCreators';

class SlideMenu extends Component {

  handleLogOut = () => {
    swal({
      title: "LOG OUT",
      text: 'Are you sure ?',
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
    .then(yes => {
      if (yes) this.props.logOut();
    });
  }

  render() {
    const {name} = this.props;
    return (
      <div className="slide-menu" >
        <Menu width={ '50%' }>
          <div className="welcome">Welcome</div>
          <p className="name">{name}</p>
          <button className="btn waves-effect waves-light"
            onClick={this.handleLogOut}
          >LOG OUT</button>
        </Menu>
        <div className="slide-menu-title">DRIVER
          <span style={{color: "#e74c3c"}} >APP</span>
        </div>
        <img src={profile} alt=""/>
      </div>
    );
  }
}

export default connect(null , actionCreators)(SlideMenu);