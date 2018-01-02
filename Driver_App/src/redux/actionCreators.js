export function logIn(payload){
  return dispatch => {
    dispatch({ type: 'LOG_IN' , payload });
  };
} 

export function logOut() {
  return dispatch => {
    dispatch({ type: 'LOG_OUT' });
  };
}

export function toggleShow() {
  return dispatch => {
    dispatch({ type: 'TOGGLE_SHOW' });
  };
}