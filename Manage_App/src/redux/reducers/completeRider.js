import {
  ADD_COMPLETE_RIDER
} from '../action/actionType';
// default state
const completeRiders = [];

const completeReducer = (state = completeRiders , action) => {
  if(action.type === ADD_COMPLETE_RIDER) {
    const {rider} = action;
    return state.concat(rider);
  }
  return state;
}
export default completeReducer;