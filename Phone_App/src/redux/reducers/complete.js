import { COMPLETE } from '../action/actionType';
const usersComplete = [];

const completeReducer = (state = usersComplete , action) => {
  if(action.type === COMPLETE) {
    const {arrAddress} = action;
    return arrAddress;
  }
  return state;
}
export default completeReducer;