import { FETCH_DEVICES,
         FETCH_DEVICE_DETAILS,
         FETCH_DEVICE_DETAILS_FAILED,
         FETCH_DEVICE_DATA,
         FETCH_DEVICE_DATA_FAILED,
         CHANGED_DEVICE_STATUS,
         CHANGE_DEVICE_STATUS_FAILED } from '../actions/types';

export default function(state = {}, action) {
  switch (action.type) {
    case FETCH_DEVICES:
      return {...state, error: null, list: action.payload };

    case FETCH_DEVICE_DETAILS:
      return {...state, error: null, device: action.payload };
    case FETCH_DEVICE_DETAILS_FAILED:
      return {...state, error: action.payload, device: null };

    case FETCH_DEVICE_DATA:
      return {...state, error: null, deviceMostRecentData: action.payload };
    case FETCH_DEVICE_DATA_FAILED:
      return {...state, error: action.payload, deviceMostRecentData: null };

    case CHANGED_DEVICE_STATUS:
      return {...state, error: null, device: action.payload };
    case CHANGE_DEVICE_STATUS_FAILED:
      return {...state, error: action.payload, device: null };
      
  }
  return state;
}
