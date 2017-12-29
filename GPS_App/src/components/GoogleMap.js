import React, { Component } from 'react';
import './GoogleMap.css';

// import library
import {socket} from '../socketClient';
import {
  createDriverMarker,
  createRiderMarker
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

    socket.emit('GET_ALL_DRIVER');
    socket.on('SEND_ALL_DRIVER' , drivers => {
      // console.log(data);
      drivers.forEach(driver => {
        createDriverMarker(driver , map);
      });
    });

    // When user order car
    socket.on('SEND_NEW_RIDER', rider => {
      createRiderMarker(rider , map);
    });
  }

  render() {
    return (
      <div id="map" ref="map" ></div>
    );
  }
}