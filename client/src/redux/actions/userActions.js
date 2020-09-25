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
