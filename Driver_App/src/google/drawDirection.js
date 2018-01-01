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
      strokeColor: '#16a085'
    }
  });
  directionsService.route({
    origin: vehiclePosMarker.getPosition(),
    destination: userPosMarker.getPosition(),
    travelMode: 'DRIVING'
  }, (resp, status) => {
    if (status !== 'OK') return;
    directionsDisplay.setDirections(resp);
  });
  
} // end handle direction