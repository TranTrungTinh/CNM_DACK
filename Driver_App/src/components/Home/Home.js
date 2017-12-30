import React, { Component } from 'react';

// components
import GoogleMap from './GoogleMap/GoogleMap';
import Header from './Header/Header';

export default class Home extends Component {
  render() {
    return (
      <div className="home" >
        <Header />
        <GoogleMap />
      </div>
    );
  }
}