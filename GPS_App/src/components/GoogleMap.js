import React, { Component } from 'react';
import './GoogleMap.css';
// import library
import {socket} from '../socketClient';
import swal from 'sweetalert2';
import {
  createDriverMarker,
  createRiderMarker,
  drawDirection,
  riderNotPickUp
} from '../google/markers';
import {mapOptions} from '../google/mapOption';
// Defind global
const google = window.google;

export default class GoogleMap extends Component {

  shouldComponentUpdate() {
    return false;
  }

  componentDidMount() {
    
    const map = new google.maps.Map(this.refs.map , mapOptions);

    // Get all driver
    socket.emit('GET_ALL_DRIVER');
    socket.on('SEND_ALL_DRIVER' , drivers => {
      drivers.forEach(driver => {
        createDriverMarker(driver , map);
      });
    });

    // When user order car
    socket.on('SEND_NEW_RIDER', rider => {
      createRiderMarker(rider , map);
    });

    // Not driver login
    socket.on('NOT_DRIVER_READY', () => {
      swal('THÔNG BÁO','Chưa có tài xế đăng nhập vào hệ thống','warning');
    })

    // When user has been pick up
    socket.on('CLOSE_NOTIFICATION', ({idDriver , idRider}) => {
      drawDirection(idDriver , idRider , map);
    });

    // No five driver login is ready
    socket.on('NO_FIVE_DRIVER', () => {
      swal('THÔNG BÁO','5 tài xế gần nhất chưa sẵn sàng','info');
    });

    // When user hasn't been pick up
    socket.on('CHOOSE_ANOTHER_DRIVER', data => {
      riderNotPickUp(data);
    }) ;
  }

  render() {
    return (
      <div id="map" ref="map" ></div>
    );
  }
}