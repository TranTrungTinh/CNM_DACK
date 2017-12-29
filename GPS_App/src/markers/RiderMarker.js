
const google = window.google;  // google maps api
let curentWindow = false; // toggle window info rider

export function createRiderMarker(rider , map , arrRider) {
  const { key , phone , address } = rider;
  const pos = { lat: +rider.lat, lng: +rider.lng };
  const content = `
  <div class="info-box-wrap">
    <img src="./images/rider.png" />
    <div class="info-box-text-wrap">
      <h6 class="address">${phone}</h6>
      <p class="price">${address}</p>
    </div>
    <div class="action-btns">
      <button type="button" class="btn btn-outline-danger btn-sm" id="${key}">Find Driver</button>
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
}