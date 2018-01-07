import {
  ADD_USER_WAITING,
  REMOVE_USER_WAITING,
  ADD_NOT_PICKUP,
  ADD_PICKUP_RIDER,
  REMOVE_PICKUP_RIDER,
  SHOW_DIRECTION
} from './actionType';

export function addWaitingRider(rider){
  return dispatch => {
    dispatch({ type: ADD_USER_WAITING , rider });
  };
}
export function removeWaitingRider(idRider){
  return dispatch => {
    dispatch({ type: REMOVE_USER_WAITING , idRider });
  };
}

export function addNotPickupRider(notPickupRider){
  return dispatch => {
    dispatch({ type: ADD_NOT_PICKUP , notPickupRider });
  };
}

export function addPickupRider(data){
  return dispatch => {
    dispatch({ type: ADD_PICKUP_RIDER , data });
  };
}

export function removePickupRider(idRider){
  return dispatch => {
    dispatch({ type: REMOVE_PICKUP_RIDER , idRider });
  };
}

export function showDirection(idRider) {
  return dispatch => {
    dispatch({ type: SHOW_DIRECTION , idRider });
  };
}