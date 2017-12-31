const google = window.google;  // google maps api

export function driverMarker(driver , map) {
  const pos = { lat: +driver.lat, lng: +driver.lng };
  const driverMarker = new google.maps.Marker({
    position: pos,
    map: map,
    animation: google.maps.Animation.DROP,
    icon: './images/car_blue.png',
    title: 'This is your vehicle'
  });
  return driverMarker;
}

export function riderMarker(rider , map) {
  const pos = { lat: +rider.lat, lng: +rider.lng };  
  const riderMarker = new google.maps.Marker({
    position: pos,
    map: map,
    animation: google.maps.Animation.DROP,
    icon: './images/user_false.png',
    title: 'Rider is waiting pick up'
  });
  return riderMarker;
}