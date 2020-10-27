import * as types from '../types';
import axios from 'axios'

export const getProfile = (id) => async (dispatch) => {
  dispatch({ type: types.GET_PROFILE_REQUEST });
  try {
    const { data } = await axios.get(`/api/v1/users/${id}`);
    dispatch({
      type: types.GET_PROFILE_SUCCESS,
      payload: data.data,
    });
  } catch (error) {
    console.log(error.response.data);
    dispatch({
      type: types.GET_PROFILE_FAILURE,
      payload: error.response.data.error,
    });
  }
};

export const followUser = (id) => async (dispatch) => {
  try {
    const { data } = await axios.post(`/api/v1/users/follow/${id}`);
    console.log(data)
    dispatch({
      type: types.FOLLOW_SUCCESS,
      payload: data.data,
    });

  } catch (error) {
    console.log(error.response.data);
    dispatch({
      type: types.FOLLOW_FAILURE,
      payload: error.response.data.error,
    });
  }
};

export const unfollowUser = (id) => async (dispatch) => {
  try {
    const { data } = await axios.post(`/api/v1/users/unfollow/${id}`);
    dispatch({
      type: types.UNFOLLOW_SUCCESS,
      payload: data.data,
    });
  } catch (error) {
    console.log(error.response.data);
    dispatch({
      type: types.UNFOLLOW_FAILURE,
      payload: error.response.data.error,
    });
  }
};
