import {
  ADD_NOT_PICKUP
} from '../action/actionType';
// default state
const notPickupRiders = [];

const notPickupReducer = (state = notPickupRiders , action) => {
  if(action.type === ADD_NOT_PICKUP) {
    const {notPickupRider} = action;
    return state.concat(notPickupRider);
  }
  return state;
}
export default notPickupReducer;