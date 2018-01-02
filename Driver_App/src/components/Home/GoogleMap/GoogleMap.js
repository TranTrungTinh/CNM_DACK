import React, { Component } from 'react';
import './GoogleMap.css';
import swal from 'sweetalert2';
import {connect} from 'react-redux';
import * as actionCreators from '../../../redux/actionCreators';
// library
import {socket} from '../../../socketClient';
import {createMap} from '../../../google/mapOption';
import {driverMarker, riderMarker} from '../../../google/markers';
import {drawDirection} from '../../../google/drawDirection';
const google = window.google

class GoogleMap extends Component {

  componentDidMount(){
    const {lat , lng , idDriver} = this.props;
    const map = new google.maps.Map(this.refs.map , createMap(lat , lng));
    const dMarker = driverMarker({lat , lng} , map);    
    if(idDriver) socket.emit('DRIVER_LOG_IN', idDriver);

    // nhan du lieu tu server
    socket.off('SEVER_SEND_RIDER');
    socket.on('SEVER_SEND_RIDER', async (riderData) => {
      const result = await swal({
        title: 'Bạn có muốn đón khách ?',
        text: 'Thông báo sẽ đóng sau 5 giây !',
        type: 'question',
        timer: 5000,
        showCancelButton: true,
        focusConfirm: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Chấp nhận'  
      });
      if(result.value) {
        socket.emit('DRIVER_ACCEPT', {idDriver , idRider: riderData.key});
        this.props.toggleShow();
        const rMarker = riderMarker(riderData , map);
        drawDirection(dMarker , rMarker, map);
      }else{
        const data = {id: riderData.key , address: riderData.address};
        socket.emit('DRIVER_CANCEL', data);
      }
    });

    // Thong bao khi co driver da nhan khach
    socket.off('CLOSE_NOTIFICATION');
    socket.on('CLOSE_NOTIFICATION', () => {
      swal({
        type: 'success',
        title: 'Welcome',
        showConfirmButton: false,
        timer: 500
      })
    });

  }

  render() {
    return (
      <div id="map" ref="map" ></div>
    );
  }
}

export default connect(null , actionCreators)(GoogleMap);