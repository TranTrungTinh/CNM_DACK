import React, { Component } from 'react';
import './Content.css';
import {socket} from '../../socketClient';

// components
import Waiting from './Profile/Waiting';
import PickUp from './Profile/PickUp';

export default class Content extends Component {

  constructor(props) {
    super(props);
    this.state = {
      waitingRiders: [],
      selectedRiders: []
    };
    this.showPickUpRider = this.showPickUpRider.bind(this);
    this.showWaitingRider = this.showWaitingRider.bind(this);
  }

  componentDidMount() {
    socket.on('SEND_NEW_RIDER', rider => {
      const waitingRiders = (preState) => ({
        ...preState , waitingRiders: preState.waitingRiders.concat(rider)
      });
      this.setState(waitingRiders);
    });

    socket.on('SEND_UPDATE_RIDER', rider => {
      const pickupRiders = (preState) => ({
        ...preState , selectedRiders: preState.selectedRiders.concat(rider)
      });
      this.setState(pickupRiders);
    });
  }

  showWaitingRider(rider) {
    const {key , phone , address} = rider;
    return (
      <Waiting 
        key={key}
        phone={phone}
        address={address}
      />
    );
  }

  showPickUpRider(rider) {
    const {phone , address , driver} = rider;
    const { name } = driver;
    return(
      <PickUp 
        phone={phone}
        address={address}
        name={name}
      />
    );
  }

  render() {
    const {waitingRiders , selectedRiders} = this.state;
    return (
      <div className="row list-state"> 
        <div className="waiting_container col" >
          <div className="list-group" id="watting_contend">
            { waitingRiders.map(this.showWaitingRider) }
          </div>
        </div>

        <div className="selected_container col" >
          <div className="list-group" id="watting_selected">
            { selectedRiders.map(this.showPickUpRider) }
          </div>
        </div>
      </div>
    );
  }
}