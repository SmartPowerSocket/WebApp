import axios from 'axios'; 
import { browserHistory } from 'react-router';
import { ROOT_URL,
        AUTH_USER,
        UNAUTH_USER,
        AUTH_ERROR,
        REGISTRATION_ERROR,
        FETCH_DEVICES,
        FETCH_DEVICE_DETAILS,
        FETCH_DEVICE_DETAILS_FAILED,
        FETCH_DEVICE_DATA,
        FETCH_DEVICE_DATA_FAILED,
        CHANGED_DEVICE_STATUS,
        CHANGE_DEVICE_STATUS_FAILED } from './types';

export function signoutUser() {
  localStorage.removeItem('token');

  return { type: UNAUTH_USER };
};

export function signinUser({email, password}) {

  // redux thunk magic (return a function that allows us to call the dispatcher
  // whenever we resolve our promises)
  return function(dispatch) {
    // { email, password } = { email: email, password: password }
    // Submit email/password to the server
    axios.post(`${ROOT_URL}/signin`, { email, password })
      .then(response => {
        // If request is good...
        // - Update state to indicate user is authenticated
        dispatch({ type: AUTH_USER });
        // - Save the JWT token
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('email', response.data.email);
        // - redirect to the route '/feature'

        browserHistory.push('/devices');
      })
      .catch(() => {
        // If request is bad...
        // - Show an error to the user
        dispatch(authError('Bad login info'));
      });

  }
}

export function signupUser({email, password}) {

  // redux thunk magic (return a function that allows us to call the dispatcher
  // whenever we resolve our promises)
  return function(dispatch) {
    // { email, password } = { email: email, password: password }
    // Submit email/password to the server
    axios.post(`${ROOT_URL}/signup`, { email, password })
      .then(response => {
        // If request is good...
        // - Save the JWT token
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('email', response.data.email);
        
        // - Update state to indicate user is authenticated
        dispatch({ type: AUTH_USER });

        browserHistory.push('/devices');
      })
      .catch(response => {
        // If request is bad...
        // - Show an error to the user
        dispatch({
          type: REGISTRATION_ERROR,
          payload: response.data.error
        });

      });
  }

}

export function getDevices() {

  return function(dispatch) {
    axios.get(ROOT_URL + '/listDevices', {
      headers: { authorization: localStorage.getItem('token') }
    }).then(response => {
        dispatch({
          type: FETCH_DEVICES,
          payload: response.data.devices
        })
    });
  };

}

export function getDeviceDetails(deviceId) {

  return function(dispatch) {
    axios.get(`${ROOT_URL}/deviceDetails?id=${deviceId}`, {
      headers: { authorization: localStorage.getItem('token') },
    }).then(response => {
        dispatch({
          type: FETCH_DEVICE_DETAILS,
          payload: response.data.device
        })
    }).catch(function(response) {
      dispatch({
        type: FETCH_DEVICE_DETAILS_FAILED,
        payload: response.data.error
      })
    });
  };

}

export function getDeviceMostRecentData(deviceId) {

  return function(dispatch) {
    axios.get(`${ROOT_URL}/deviceMostRecentData?id=${deviceId}`, {
      headers: { authorization: localStorage.getItem('token') },
    }).then(response => {
        dispatch({
          type: FETCH_DEVICE_DATA,
          payload: response.data.deviceMostRecentData
        })
    }).catch(function(response) {
      dispatch({
        type: FETCH_DEVICE_DATA_FAILED,
        payload: response.data.error
      })
    });
  };

}

export function changeDeviceStatus(deviceId, status, device) {

  return function(dispatch) {
    axios.post(`${ROOT_URL}/changeDeviceStatus`, { deviceId: deviceId, status: status }, {
      headers: { authorization: localStorage.getItem('token') }
    }).then(response => {

        if (status === 'Deleted') {
          browserHistory.push('/devices');
        } else {
          dispatch({
            type: CHANGED_DEVICE_STATUS,
            payload: response.data.device
          });
        }

    }).catch(function(response) {

      dispatch({
        type: CHANGE_DEVICE_STATUS_FAILED,
        payload: response.data.error
      })
    });
  };
}

export function authError(error) {
  return {
    type: AUTH_ERROR,
    payload: error
  };
}
