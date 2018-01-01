const google = window.google;
// find cars for rider waiting with index
// input: ridermarker , arrCars(100cars) , google base
// return =>: {ridermarker , cars: [{distance, vehicle: e.pos, data: e.driver}]}
export function findFiveCar(riderMarker , arrVehicle) {
  const positionUser = riderMarker.getPosition();
  const arrDistance = arrVehicle.map(e => {
    const positionCar = e.pos.getPosition();
    const distance = google.maps.geometry.spherical.computeDistanceBetween(positionUser, positionCar);
    return { distance, vehicle: e.pos, data: e.driver };
  });
  arrDistance.sort((a, b) => a.distance - b.distance);
  const fiveCars = []; // store 5 five
  for(let choose = 0 ; choose < 5; choose++) {
    const {vehicle , data} = arrDistance[choose];
    const selectedCar = {vehicle , data};
    fiveCars.push(selectedCar);
  }
  return fiveCars;
}
