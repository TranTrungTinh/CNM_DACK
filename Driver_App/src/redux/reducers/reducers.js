import { combineReducers } from 'redux';
import currenUserReducer from './profileDriver';
import showControllReducer from './isShowControll';

const reducers = combineReducers({
  profile: currenUserReducer,
  isShow: showControllReducer
});

export default reducers;