import React, { Component } from 'react';
import './GoogleMap.css';
import swal from 'sweetalert2';
// redux
import {connect} from 'react-redux';
import * as actionCreators from '../../../redux/actionCreators';
//component
import Controll from '../Controll/Controll';
// library
import {socket} from '../../../socketClient';
import {createMap} from '../../../google/mapOption';
import {driverMarker, riderMarker} from '../../../google/markers';
import {drawDirection} from '../../../google/drawDirection';
const google = window.google

class GoogleMap extends Component {

  constructor(props) {
    super(props);
    this.state = {idRider: '' , map: {} , dMarker: {} }
    this.openClickMap = this.openClickMap.bind(this);
    this.offClickMap = this.offClickMap.bind(this);
  }

  componentDidMount(){
    const {lat , lng , idDriver} = this.props;
    const map = new google.maps.Map(this.refs.map , createMap(lat , lng));
    const dMarker = driverMarker({lat , lng} , map);  
    this.setState({ map , dMarker });
    // nhan du lieu tu server
    socket.on('SEVER_SEND_RIDER',  (riderData) => {
      swal({
        title: 'Bạn có muốn đón khách ?',
        text: 'Thông báo sẽ đóng sau 5 giây !',
        type: 'question',
        timer: 5000,
        showCancelButton: true,
        focusConfirm: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Chấp nhận'  
      }).then(({dismiss , value}) => {
        if(dismiss === 'timer' || dismiss === 'cancel') {
          const data = {id: riderData.id , address: riderData.address};
          socket.emit('DRIVER_CANCEL', data);
          return;
        }
        socket.emit('DRIVER_ACCEPT', {idDriver , idRider: riderData.id});
        this.setState({idRider: riderData.id});      
        this.props.toggleShow();
        const rMarker = riderMarker(riderData , map);
        drawDirection(dMarker , rMarker, map);
        return;
      });
    }); 

    // Thong bao khi co driver da nhan khach
    socket.on('CLOSE_NOTIFICATION', () => {
      swal({
        type: 'success',
        title: 'Welcome',
        showConfirmButton: false,
        timer: 500
      })
    });
  }

  componentWillMount() {
    // remove listener with socket.io
    socket.off('SEVER_SEND_RIDER');
    socket.off('CLOSE_NOTIFICATION');    
  }

  openClickMap() {
    const {map , dMarker} = this.state;
    const {idDriver} = this.props;
    map.addListener('click',(event) => {
      const lat = event.latLng.lat();
      const lng = event.latLng.lng();
      const pos = new google.maps.LatLng(lat,lng);
      dMarker.setPosition(pos);
      socket.emit('CLIENT_SEND_POSITION', {idDriver , lat , lng});
    });
  }

  offClickMap() {
    const {map} = this.state;
    google.maps.event.clearListeners(map, 'click');
  }

  render() {
    const {isShow} = this.props;
    const isControllComponents = isShow ? 
      <Controll onMap={this.openClickMap} offMap={this.offClickMap}/> : null;
    return (
      <div>
        <div id="map" ref="map" ></div>
        { isControllComponents }
      </div>
    );
  }
}
const mapStateToProp = (state) => ({ isShow: state.isShow });
export default connect(mapStateToProp , actionCreators)(GoogleMap);