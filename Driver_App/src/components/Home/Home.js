import React, { Component } from 'react';

import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';

// components
import GoogleMap from './GoogleMap/GoogleMap';
import Status from './Status/Status';
import SlideMenu from './SlideMenu/SlideMenu';
import Controll from './Controll/Controll';

class Home extends Component {

  render() {
    const {name , lat , lng , id } = this.props.driver;
    const {isShow} = this.props;
    const redirect = name ? null : <Redirect to="/" />;
    const isControllComponents = isShow ? <Controll /> : null;
    return (
      <div className="home" >
        {redirect}
        <Status />
        <SlideMenu name={name} idDriver={id} />
        <GoogleMap lat={lat} lng={lng} idDriver={id}/>
        { isControllComponents }
      </div>
    );
  }
}
const mapStateToProp = (state) => ({
  driver: state.profile,
  isShow: state.isShow
});
export default connect(mapStateToProp)(Home);