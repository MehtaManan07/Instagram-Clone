import {
    GET_ME_FAILURE,
    GET_ME_SUCCESS,
    LOGIN_FAILURE,
    LOGIN_SUCCESS,
    LOGOUT_FAILURE,
    LOGOUT_SUCCESS,
    SIGNUP_FAILURE,
    SIGNUP_SUCCESS,
  } from '../types';
  
  const initialState = {
    loading: true,
    error: null,
    user: null,
  };
  
  export default (state = initialState, { type, payload }) => {
    switch (type) {
      case SIGNUP_SUCCESS:
      case LOGIN_SUCCESS:
      case GET_ME_SUCCESS:
        localStorage.setItem('NatourAuth', 'grehy4930thr0tghsfgiofifdpf-0r-9er')
        return { ...state, user: payload, loading: false };
  
      case LOGOUT_SUCCESS:
        localStorage.removeItem('NatourAuth')
        return { ...state, loading: false, user: null }
  
      case SIGNUP_FAILURE:
      case LOGIN_FAILURE:
      case GET_ME_FAILURE:
        localStorage.removeItem("token");
        return { ...state, error: payload, loading: false };
  
      default:
        return state;
    }
  };
  