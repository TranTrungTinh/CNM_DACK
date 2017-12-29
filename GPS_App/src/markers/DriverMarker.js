
const google = window.google;  // google maps api
let curentDriverWindow = false // toggle window info driver 


export function createDriverMarker(driver , map , arrVehicle) {
  const {name} = driver;
  const pos = { lat: +driver.lat, lng: +driver.lng };
  const content = `
    <div class="info-box-wrap">
      <img src="./images/driver_profile.png" />
      <div class="info-box-text-wrap">
        <h6 class="address">${name}</h6>
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
