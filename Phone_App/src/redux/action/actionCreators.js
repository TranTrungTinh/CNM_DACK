import { COMPLETE , NOT_PICK_UP } from './actionType';

export function completeHistory(arrAddress){
  return dispatch => {
    dispatch({ type: COMPLETE , arrAddress });
  };
}

export function notpickupHistory(arrAddress){
  return dispatch => {
    dispatch({ type: NOT_PICK_UP , arrAddress });
  };
}