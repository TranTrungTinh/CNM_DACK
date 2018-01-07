import {
  ADD_PICKUP_RIDER,
  REMOVE_PICKUP_RIDER,
  SHOW_DIRECTION
} from '../action/actionType';
// default state

const PickUpRiders = {
  currentData: {},
  pickupRiders: []
};

const pickupReducer = (state = PickUpRiders , action) => {
  if(action.type === ADD_PICKUP_RIDER) {
    const {data} = action;
    return {...state , pickupRiders: state.pickupRiders.concat(data) };
  }
  if(action.type === REMOVE_PICKUP_RIDER) {
    const {idRider} = action;
    return {...state , pickupRiders: state.pickupRiders.filter(data => data.rider.id !== idRider)};
  }
  if(action.type === SHOW_DIRECTION) {
    const {idRider} = action;
    const index = state.pickupRiders.findIndex(data => data.rider.id === idRider);
    const currentData = state.pickupRiders[index];
    return {...state , currentData};
  }
  return state;
}

export default pickupReducer;