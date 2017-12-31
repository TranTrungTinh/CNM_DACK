import { combineReducers } from 'redux';
import currenUserReducer from './profileDriver';

const reducers = combineReducers({
  profile: currenUserReducer
});

export default reducers;