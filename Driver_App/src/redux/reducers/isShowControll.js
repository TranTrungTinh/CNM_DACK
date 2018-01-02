const showControllReducer = (state = false , action) => {
  if(action.type === 'TOGGLE_SHOW') {
    return !state;
  }
  return state;
}
export default showControllReducer;