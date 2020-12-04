import { combineReducers } from 'redux';
import market from './market';
import project from './project';
import auth from './auth';

export default combineReducers({
  auth,
  market,
  project
})
