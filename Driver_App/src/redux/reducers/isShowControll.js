const showControllReducer = (state = false , action) => {
  if(action.type === 'SHOW_CONTROLL') {
    return true;
  }
  if(action.type === 'HIDE_CONTROLL') {
    return false;
  }
  return state;
}
export default showControllReducer;