import React, { Component } from 'react';

import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';

// components
import GoogleMap from './GoogleMap/GoogleMap';
import Status from './Status/Status';
import SlideMenu from './SlideMenu/SlideMenu';

class Home extends Component {

  render() {
    const {name , lat , lng , id} = this.props.driver;
    const redirect = name ? null : <Redirect to="/" />;
    return (
      <div className="home" >
        {redirect}
        <Status />
        <SlideMenu name={name} />
        <GoogleMap lat={lat} lng={lng} idDriver={id}/>
      </div>
    );
  }
}
const mapStateToProp = (state) => ({
  driver: state.profile
});
export default connect(mapStateToProp)(Home);