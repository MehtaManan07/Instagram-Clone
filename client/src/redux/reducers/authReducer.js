import {
  GET_ME_FAILURE,
  GET_ME_SUCCESS,
  LOGIN_FAILURE,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGOUT_SUCCESS,
  SIGNUP_FAILURE,
  SIGNUP_REQUEST,
  SIGNUP_SUCCESS,
} from '../types';

const initialState = {
  loading: false,
  error: null,
  user: null,
  isAuth: false,
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case SIGNUP_REQUEST:
    case LOGIN_REQUEST:
      return { ...state, loading: true };

    case SIGNUP_SUCCESS:
    case LOGIN_SUCCESS:
    case GET_ME_SUCCESS:
      localStorage.setItem(
        'Instagram1',
        'grehy43443930thr0tghsfgiofifdpf-0r-9er'
      );
      return {
        ...state,
        user: payload,
        loading: false,
        error: null,
        isAuth: true,
      };

    case LOGOUT_SUCCESS:
      localStorage.removeItem('Instagram1');
      return {
        ...state,
        loading: false,
        user: null,
        error: null,
        isAuth: false,
      };

    case SIGNUP_FAILURE:
    case LOGIN_FAILURE:
    case GET_ME_FAILURE:
      localStorage.removeItem('token');
      return {
        ...state,
        error: payload,
        loading: false,
        user: null,
        isAuth: false,
      };

    default:
      return state;
  }
};
