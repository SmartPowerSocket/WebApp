import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';
import authReducer from './auth_reducer';
import devicesReducer from './devices_reducer';

const rootReducer = combineReducers({
  form,  //form: form - ES6
  auth: authReducer,
  devices: devicesReducer
});

export default rootReducer;
