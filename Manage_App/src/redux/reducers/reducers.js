import { combineReducers } from 'redux';
// reducers
import waitingRiderReducer from './waitingRiders';
import notPickupReducer from './notPickupRider';
import pickupReducer from './pickupRider';
import completeReducer from './completeRider';

const reducers = combineReducers({
  waitingRiders: waitingRiderReducer,
  notSelectedRiders: notPickupReducer,
  selectedRiders: pickupReducer,
  completeRiders: completeReducer
});

export default reducers;