import {
  LOGIN_FAILURE,
  LOGIN_SUCCESS,
  LOGIN_REQUEST,
  SIGNUP_FAILURE,
  SIGNUP_SUCCESS,
  SIGNUP_REQUEST,
  LOGOUT_SUCCESS,
  LOGOUT_FAILURE,
  GET_ME_SUCCESS,
  GET_ME_FAILURE
} from '../types';
import axios from 'axios';

export const signupUser = (userData) => async (dispatch) => {
  dispatch({ type: SIGNUP_REQUEST });
  try {
    const { data } = await axios.post(`/api/v1/auth/signup`, userData);
    console.log(data);
    dispatch({ type: SIGNUP_SUCCESS, payload: data.data });
  } catch (error) {
    const displayErr = error.response.data.error.split(',')[0];
    dispatch({
      type: SIGNUP_FAILURE,
      payload: displayErr,
    });
  }
};

export const loginUser = (userData) => async (dispatch) => {
  dispatch({ type: LOGIN_REQUEST });
  try {
    const { data } = await axios.post(`/api/v1/auth/login`, userData);
    console.log(data);
    dispatch({ type: LOGIN_SUCCESS, payload: data.data });
  } catch (error) {
    const displayErr = error.response.data.error.split(',')[0];
    dispatch({
      type: LOGIN_FAILURE,
      payload: displayErr,
    });
  }
};

export const getUser = () => async (dispatch) => {
  try {
    const { data } = await axios.get(`/api/v1/users/me`);
    dispatch({
      type: GET_ME_SUCCESS,
      payload: data.data,
    });

    console.log(data);
  } catch (error) {
    dispatch({
      type: GET_ME_FAILURE,
      payload: error.response.data.error,
    });
  }
};

export const logoutUser = () => async (dispatch) => {
  try {
    await axios.get(`/api/v1/users/logout`);
    dispatch({
      type: LOGOUT_SUCCESS,
    });
  } catch (error) {
    dispatch({
      type: LOGOUT_FAILURE,
      payload: error.response.data.error,
    });
  }
};
