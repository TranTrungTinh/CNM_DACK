import React, { Component } from 'react';
import './GoogleMap.css';
import {mapOptions} from '../../../google/mapOption';
const google = window.google

export default class GoogleMap extends Component {

  shouldComponentUpdate() {
    return false;
  }

  componentDidMount(){
    new google.maps.Map(this.refs.map , mapOptions);
  }

  render() {
    return (
      <div id="map" ref="map" ></div>
    );
  }
}