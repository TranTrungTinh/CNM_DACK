import {combineReducers} from 'redux';
import completeReducer from './complete';
import notpickupReducer from './notpickup';

const reducers = combineReducers({
  completes: completeReducer,
  notpickup: notpickupReducer
});

export default reducers;