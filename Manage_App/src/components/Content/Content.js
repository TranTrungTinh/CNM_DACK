import React, { Component } from 'react';
import './Content.css';
import {socket} from '../../socketClient';

// components
import Waiting from './Profile/Waiting';
import PickUp from './Profile/PickUp';
import NotPickUp from './Profile/NotPickUp';

export default class Content extends Component {

  constructor(props) {
    super(props);
    this.state = {
      waitingRiders: [],
      selectedRiders: []
    };
    this.showPickUpRider = this.showPickUpRider.bind(this);
    this.showNotPickUpRider = this.showNotPickUpRider.bind(this);
    this.showWaitingRider = this.showWaitingRider.bind(this);
  }

  componentDidMount() {
    socket.on('SEND_NEW_RIDER', rider => {
      const waitingRiders = (preState) => ({
        ...preState , waitingRiders: preState.waitingRiders.concat(rider)
      });
      this.setState(waitingRiders);
    });

    socket.on('SEND_UPDATE_RIDER', data => {
      const pickupRiders = (preState) => ({
        ...preState , selectedRiders: preState.selectedRiders.concat(data)
      });
      this.setState(pickupRiders);
    });
  }

  showWaitingRider(rider) {
    const {id , phone , address} = rider;
    return (
      <Waiting 
        key={id}
        phone={phone}
        address={address}
      />
    );
  }

  showNotPickUpRider(rider) {
    const {id , phone , address} = rider;
    return (
      <NotPickUp 
        key={id}
        phone={phone}
        address={address}
      />
    );
  }

  showPickUpRider({rider , driver}) {
    const { phone , address , id } = rider;
    const { name } = driver;
    return(
      <PickUp 
        key={id}
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

        <div className="waiting_container col" >
          <div className="list-group" id="watting_contend">
            { waitingRiders.map(this.showNotPickUpRider) }
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