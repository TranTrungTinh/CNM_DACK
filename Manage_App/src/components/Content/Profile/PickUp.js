import React, { Component } from 'react';
import './PickUp.css';
// redux
import {connect} from 'react-redux';
import * as actionCreators from '../../../redux/action/actionCreators';

import user_profile from '../../../images/user_profile.png';
import taxi from '../../../images/taxi.png';

class PickUp extends Component {

  handleClick = () => {
    const {idRider , showDirection} = this.props;
    showDirection(idRider);
  }

  render() {
    const {phone , address , name} = this.props;
    const clsName = `
    list-group-item 
    list-group-item-action 
    list-group-item-success 
    list_picktup`;
    return (
      <a href="#pickup" className={clsName}>
        <img src={user_profile} alt="" />
        <div className="wrapper_profile">
          <h6>{phone}</h6>
          <p>{address}</p>
        </div>
        <div className="wrapper_profile_driver">
          <img src={taxi} alt="" />
          <h6>{name}</h6>
        </div>
        <button 
          className="btn btn-outline-danger btn-sm btn-show-direction" 
          onClick={this.handleClick}
        >Show Direction</button>
      </a>
    );
  }
}
export default connect(null , actionCreators)(PickUp);