/* Global variable */
import {calculateAndDisplayRoute} from './drawDirection';
import {socket} from '../socketClient';

const google = window.google;  // google maps api
let curentWindow = false; // toggle window info rider
let curentDriverWindow = false // toggle window info driver 

// store data
const arrVehicle = []; // store position and data driver
const arrRider = []; // store position and data rider
const arrCacheData = []; // store cache position rider and position driver
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
  const { key , phone , address } = rider;
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
  arrRider.push({pos: riderMarker , id: key});

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
  // handle event click rider
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
    // load cache data
    const cacheDriver = arrCacheData.find(e => e.id === key);
    if (cacheDriver) {
      const { driver, rider } = cacheDriver;
      calculateAndDisplayRoute(driver, rider, map);
      info.close();
      return 0;
    }

    const positionUser = riderMarker.getPosition();
    const arrDistance = arrVehicle.map(e => {
      const positionCar = e.pos.getPosition();
      const distance = google.maps.geometry.spherical.computeDistanceBetween(positionUser, positionCar);
      return { distance, vehicle: e.pos, data: e.driver };
    });

    const selectedCar = arrDistance.sort((a, b) => a.distance - b.distance)[0];
    // display route in map
    selectedCar.vehicle.setIcon('./images/car_red.png');
    riderMarker.setIcon('./images/user_true.png');
    calculateAndDisplayRoute(selectedCar.vehicle, riderMarker, map);

    // cache data to improve performent
    const cacheData = { driver: selectedCar.vehicle, rider: riderMarker, id: key };
    arrCacheData.push(cacheData);   
    
    const dataSend = {driver: selectedCar.data, userKey: key , rider};
    console.log(dataSend);
    socket.emit('RIDER_SELECTED_DRIVER', dataSend);
  });
 
}