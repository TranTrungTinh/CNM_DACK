import React, { Component } from 'react';
import './SlideMenu.css';
// library
import swal from 'sweetalert2';
import {slide as Menu} from 'react-burger-menu';
// resource
import profile from '../../../images/driver.png';
import {socket} from '../../../socketClient';
// redux
import {connect} from 'react-redux';
import * as actionCreators from '../../../redux/actionCreators';

class SlideMenu extends Component {

  state = {
    isOpen: false
  }
  
  handleLogOut = async () => {
    this.setState({isOpen: false});
    const result = await swal({
      title: 'LOG OUT',
      text: "Are you sure ?",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#2ecc71',
      cancelButtonColor: '#e74c3c',
      confirmButtonText: 'Yes, log out!'
    });
    if(result.value) {
      socket.emit('DRIVER_LOG_OUT', this.props.idDriver);
      this.props.toggleShow();
      this.props.logOut();
    }
  }

  render() {
    const {name} = this.props;
    return (
      <div className="slide-menu" >
        <Menu width={ '50%' } isOpen={ this.state.isOpen } >
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