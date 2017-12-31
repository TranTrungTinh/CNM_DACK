import React, { Component } from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';
// components
import GoogleMap from './GoogleMap/GoogleMap';
import Status from './Status/Status';
import SlideMenu from './SlideMenu/SlideMenu';


class Home extends Component {
  render() {
    const {name} = this.props.driver;
    const redirect = name ? null : <Redirect to="/" />;
    return (
      <div className="home" >
        {redirect}
        <Status />
        <SlideMenu name={name} />
        <GoogleMap />
      </div>
    );
  }
}
const mapStateToProp = (state) => ({
  driver: state.profile
});
export default connect(mapStateToProp)(Home);