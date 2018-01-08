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

export function showControll() {
  return dispatch => {
    dispatch({ type: 'SHOW_CONTROLL' });
  };
}

export function hideControll() {
  return dispatch => {
    dispatch({ type: 'HIDE_CONTROLL' });
  };
}