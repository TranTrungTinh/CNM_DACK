import {
  ADD_PICKUP_RIDER,
  REMOVE_PICKUP_RIDER
} from '../action/actionType';
// default state
const pickupRiders = [];

const pickupReducer = (state = pickupRiders , action) => {
  if(action.type === ADD_PICKUP_RIDER) {
    const {data} = action;
    return state.concat(data);
  }
  if(action.type === REMOVE_PICKUP_RIDER) {
    const {idRider} = action;
    return state.filter(data => data.rider.id !== idRider);
  }
  return state;
}

export default pickupReducer;