const google = window.google;  // google maps api
// direction maps
const directionsService = new google.maps.DirectionsService();
const directionsDisplay = new google.maps.DirectionsRenderer();

// handle direction
export function drawDirection(vehiclePosMarker , userPosMarker , map) {
  directionsDisplay.setMap(map);
  directionsDisplay.setOptions({
    suppressMarkers: true,
    polylineOptions: {
      strokeColor: '#f39c12'
    }
  });
  directionsService.route({
    origin: vehiclePosMarker.getPosition(),
    destination: userPosMarker.getPosition(),
    travelMode: 'DRIVING'
  }, (resp, status) => {
    if (status !== 'OK') return;
    directionsDisplay.setDirections(resp);
    // google.maps.event.clearListeners(map, 'click');
    // map.addListener('click', () => {
    //   vehiclePosMarker.setMap(null);
    //   userPosMarker.setMap(null);
    //   directionsDisplay.setMap(null);
    // });
  });
  
} // end handle direction