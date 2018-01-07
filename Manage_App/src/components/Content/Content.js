import React, { Component } from 'react';
import './Content.css';
import {socket} from '../../socketClient';
//redux
import {connect} from 'react-redux';
import * as actionCreators from '../../redux/action/actionCreators';
// components
import Waiting from './Profile/Waiting';
import PickUp from './Profile/PickUp';
import NotPickUp from './Profile/NotPickUp';
import Complete from './Profile/Complete';

class Content extends Component {

  constructor(props) {
    super(props);
    this.showPickUpRider = this.showPickUpRider.bind(this);
    this.showNotPickUpRider = this.showNotPickUpRider.bind(this);
    this.showWaitingRider = this.showWaitingRider.bind(this);
    this.showCompleteRider = this.showCompleteRider.bind(this);
  }

  componentDidMount() {
    const {
      addWaitingRider,
      addNotPickupRider,
      addPickupRider,
      removeWaitingRider
    } = this.props;
    // handle user is waiting car
    socket.on('SEND_NEW_RIDER', rider => {
      addWaitingRider(rider);
    });
    
    // handle user hasn't been pick up
    socket.on('SEND_NOT_PICKUP_RIDER', notPickupRider => {
      addNotPickupRider(notPickupRider);
    });

    // handle user has been pick up
    socket.on('SEND_PICKUP_RIDER', data => {
      addPickupRider(data);
    });

    // filter rider has been pick up
    socket.on('CLOSE_NOTIFICATION', ({ idRider }) => {
      removeWaitingRider(idRider);
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
        idRider={id}
        phone={phone}
        address={address}
        name={name}
      />
    );
  }

  showCompleteRider(rider) {
    const {id , phone , address} = rider;
    return (
      <Complete 
        key={id}
        phone={phone}
        address={address}
      />
    );
  }
  render() {
    const {
      waitingRiders , selectedRiders , notSelectedRiders , completeRiders
    } = this.props;

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

        <div className="waiting_container col" >
          <div className="list-group" id="watting_selected">
            { selectedRiders.map(this.showPickUpRider) }
          </div>
        </div>

        <div className="waiting_container col" >
          <div className="list-group" id="watting_contend">
            { completeRiders.map(this.showCompleteRider) }
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  waitingRiders: state.waitingRiders,
  notSelectedRiders: state.notSelectedRiders,
  selectedRiders: state.selectedRiders.pickupRiders,
  completeRiders: state.completeRiders
});
export default connect(mapStateToProps , actionCreators)(Content);