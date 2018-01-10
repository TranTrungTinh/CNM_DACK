import { NOT_PICK_UP } from '../action/actionType';
const userNotPickup = [];

const notPickupReducer = (state = userNotPickup , action) => {
  if(action.type === NOT_PICK_UP) {
    const {arrAddress} = action;
    return arrAddress;
  }
  return state;
}
export default notPickupReducer;