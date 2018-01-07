import React, { Component } from 'react';
import './GoogleMap.css';

import {mapOptions} from '../../google/mapOption';
import {driverMarker , riderMarker} from '../../google/markers';
import {drawDirection} from '../../google/drawDirection';
// Defind global
const google = window.google;

export default class GoogleMap extends Component {

  constructor(props) {
    super(props);
    this.state = {
      map: {},
      DMarker: {},
      RMarker: {}
    }
  }

  componentWillReceiveProps(nextProps) {
    const {driver , rider} = nextProps;
    this.hideMarker();
    this.drawDirectionOnMap(driver , rider);
  }

  componentDidMount() {
    const map = new google.maps.Map(this.refs.map , mapOptions);
    this.setState({map});
  }

  hideMarker = () => {
    const { DMarker , RMarker} = this.state;
    // console.log(DMarker.clickable);
    if(DMarker.clickable) {
      DMarker.setMap(null);
      RMarker.setMap(null);
    }
  }

  drawDirectionOnMap = (driver , rider) => {
    const { map } = this.state;
    const DMarker = driverMarker(driver , map);
    const RMarker = riderMarker(rider , map);
    drawDirection(DMarker , RMarker , map);
    // store marker will setMap(null)
    this.setState({DMarker , RMarker});
  }

  render() {
    return (
      <div id="map" ref="map" ></div>
    );
  }
}