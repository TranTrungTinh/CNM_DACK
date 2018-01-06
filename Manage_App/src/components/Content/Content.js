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
      notSelectedRiders: [],
      selectedRiders: []
    };
    this.showPickUpRider = this.showPickUpRider.bind(this);
    this.showNotPickUpRider = this.showNotPickUpRider.bind(this);
    this.showWaitingRider = this.showWaitingRider.bind(this);
  }

  componentDidMount() {
    // handle user is waiting car
    socket.on('SEND_NEW_RIDER', rider => {
      const waitingRiders = (preState) => ({
        ...preState , waitingRiders: preState.waitingRiders.concat(rider)
      });
      this.setState(waitingRiders);
    });
    
    // handle user hasn't been pick up
    socket.on('SEND_NOT_PICKUP_RIDER', notPickupRider => {
      const notPickupRiders = (preState) => ({
        ...preState ,
        waitingRiders: preState.waitingRiders.filter(rider => rider.id !== notPickupRider.id), 
        notSelectedRiders: preState.notSelectedRiders.concat(notPickupRider)
      });
      this.setState(notPickupRiders);
    });

    // handle user has been pick up
    socket.on('SEND_PICKUP_RIDER', data => {
      const pickupRiders = (preState) => ({
        ...preState , selectedRiders: preState.selectedRiders.concat(data)
      });
      this.setState(pickupRiders);
    });

    // filter rider has been pick up
    socket.on('CLOSE_NOTIFICATION', ({idDriver , idRider}) => {
      const waitingRiders = (preState) => ({
        ...preState,
        waitingRiders: preState.waitingRiders.filter(rider => rider.id !== idRider)
      });
      this.setState(waitingRiders);
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
    const {waitingRiders , selectedRiders , notSelectedRiders} = this.state;
    return (
      <div className="row list-state"> 
        <div className="waiting_container col" >
          <div className="list-group" id="watting_contend">
            { waitingRiders.map(this.showWaitingRider) }
          </div>
        </div>

        <div className="waiting_container col" >
          <div className="list-group" id="watting_contend">
            { notSelectedRiders.map(this.showNotPickUpRider) }
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