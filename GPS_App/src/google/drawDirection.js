const google = window.google;  // google maps api

// direction maps
const directionsService = new google.maps.DirectionsService();
const directionsDisplay = new google.maps.DirectionsRenderer();

// handle direction with driver to rider
export function calculateAndDisplayRoute(vehiclePosMarker , userPosMarker , map) {
  directionsDisplay.setMap(map);
  directionsDisplay.setOptions({
    suppressMarkers: true,
    polylineOptions: {
      strokeColor: '#8e44ad'
    }
  });
  directionsService.route({
    origin: vehiclePosMarker.getPosition(),
    destination: userPosMarker.getPosition(),
    travelMode: 'DRIVING'
  }, (resp, status) => {
    if (status !== 'OK') return;
    directionsDisplay.setDirections(resp);
    // console.log(resp);
    const lengths = resp.routes[0].legs[0].steps[1].distance.text;
    const times = resp.routes[0].legs[0].steps[1].duration.text;
    // const middle = resp.routes[0].legs[0].steps.length/2;
    const pos = resp.routes[0].legs[0].steps[1].end_location;
    const content = `<div class="show">
    <label id="lengths">${lengths}</label><br/><label>${times}</label></div>`;
    const info = new google.maps.InfoWindow({content});
    info.setPosition(pos);
    info.open(map);
    // setTimeout(() => info.close(),4000);
  });
} // end handle direction