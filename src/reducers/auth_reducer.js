import { AUTH_USER, UNAUTH_USER, AUTH_ERROR, REGISTRATION_ERROR } from '../actions/types';

export default function(state = {}, action) {
  switch (action.type) {
    case AUTH_USER:
      return {...state, authError: '', authenticated: true };
    case UNAUTH_USER:
      return {...state, authError: '', authenticated: false };
    case AUTH_ERROR:
      return {...state, authError: action.payload };
    case REGISTRATION_ERROR:
   	  return {...state, registrationError: action.payload };
  }
  return state;
}
