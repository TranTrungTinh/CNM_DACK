import {
  ADD_USER_WAITING,
  REMOVE_USER_WAITING
} from '../action/actionType';
// default state
const waitingRiders = [];

const waitingReducer = (state = waitingRiders , action) => {
  if(action.type === ADD_USER_WAITING) {
    const {rider} = action;
    return state.concat(rider);
  }
  if(action.type === REMOVE_USER_WAITING) {
    const {idRider} = action;
    return state.filter(rider => rider.id !== idRider);
  }
  return state;
}
export default waitingReducer;