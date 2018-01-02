/* Global variable */
import {calculateAndDisplayRoute} from './drawDirection';
import {socket} from '../socketClient';
import {findFiveCar} from './findCarforUser';
import swal from 'sweetalert2';

const google = window.google;  // google maps api
let curentWindow = false; // toggle window info rider
let curentDriverWindow = false // toggle window info driver 

// store data
const arrVehicle = []; // store position and data driver
const arrRider = []; // store position and data rider
// const arrCacheData = []; // store cache position rider and position driver
/* ================================================================================== */

/* ========= Driver Marker ========== */
export function createDriverMarker(driver , map) {
  const {name , username} = driver;
  const pos = { lat: +driver.lat, lng: +driver.lng };
  const content = `
    <div class="info-box-wrap">
      <img src="./images/driver_profile.png" />
      <div class="info-box-text-wrap">
        <h6 class="address">${name}</h6>
        <p class="price">${username}</p>
      </div>
    </div>`;
  const newDriverMarker = new google.maps.Marker({
    position: pos,
    map: map,
    animation: google.maps.Animation.DROP,
    icon: './images/car_blue.png',
    title: 'This is the vehicle'
  });
  arrVehicle.push({pos: newDriverMarker, driver});

  // Create window info driver
  const info = new google.maps.InfoWindow({ content });
  newDriverMarker.addListener('mouseover' , () => {
    if (curentDriverWindow) {
      curentDriverWindow.close();
    } // toggle infowindow
    curentDriverWindow = info;
    info.open(map, newDriverMarker);
  });
  newDriverMarker.addListener('mouseout' , () => {
    info.close();
  });
}
/* ================================================================================== */
/* ========= Rider Marker ========== */
export function createRiderMarker(rider , map) {
  const { id , phone , address } = rider;
  const pos = { lat: +rider.lat, lng: +rider.lng };
  const content = `
  <div class="info-box-wrap">
    <img src="./images/rider.png" />
    <div class="info-box-text-wrap">
      <h6 class="address">${phone}</h6>
      <p class="price">${address}</p>
    </div>
  </div>`;
  
  const riderMarker = new google.maps.Marker({
    position: pos,
    map: map,
    animation: google.maps.Animation.BOUNCE,
    icon: './images/user_false.png',
    draggable: true, 
    title: 'Rider is waiting the diver'
  });

  // add array rider
  arrRider.push({pos: riderMarker , id: id});

  // draggable rider marker
  let beforePosition = null;
  let flag = 1;
  google.maps.event.addDomListener(riderMarker , 'dragstart' , event => {
    if(flag === 1) beforePosition = riderMarker.getPosition();        
  });
  google.maps.event.addDomListener(riderMarker , 'dragend' , event => {
    flag++;
  });

  const info = new google.maps.InfoWindow({ content });
  // handle view info rider
  riderMarker.addListener('click', () => {
    riderMarker.setAnimation(null);
    
    if (curentWindow) {
      curentWindow.close();
    } // toggle infowindow
    curentWindow = info;
    info.open(map, riderMarker);
  });
  map.addListener('click', () => info.close());

  // handle call driver
  riderMarker.addListener('dblclick', () => {
    if (beforePosition) riderMarker.setPosition(beforePosition);

    const fiveCar = findFiveCar(riderMarker , arrVehicle); 
    const driversID = fiveCar.map(e => e.data.id); 
    const dataSend = {driversID , rider};
    socket.emit('RIDER_SELECTED_DRIVER', dataSend);
    
  });
}

export function drawDirection(idDriver , idRider , map) {
  const indexDriver = arrVehicle.findIndex(e => e.driver.id === idDriver);
  const driverPos = arrVehicle[indexDriver].pos;
  const indexRider = arrRider.findIndex(e => e.id === idRider);
  const riderPos = arrRider[indexRider].pos;
  
  // draw position
  calculateAndDisplayRoute(driverPos, riderPos, map);

  // delete data in array
  arrVehicle.splice(indexDriver , 1);
  arrRider.splice(indexRider , 1);
}

export function riderNotPickUp(data) {
  const {id , address} = data;
  const index = arrRider.findIndex(e => e.id === id);
  if(index < 0) return;
  const { pos } = arrRider[index];
  swal({
    title: 'THÔNG BÁO',
    text: `Địa chỉ: ${address} KHÔNG CÓ XE !!!`,
    timer: 5000,
    type: 'info',
    onOpen: () => {
      swal.showLoading();
    }
  });
  pos.setMap(null);
  arrRider.splice(index , 1);
  
}

