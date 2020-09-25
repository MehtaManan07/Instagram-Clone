import axios from 'axios';

import {
  NEWPOST_FAILURE,
  NEWPOST_REQUEST,
  NEWPOST_SUCCESS,
  GET_ALL_FAILURE,
  GET_ALL_REQUEST,
  GET_ALL_SUCCESS
} from '../types';

export const newPost = (postData) => async (dispatch) => {
  dispatch({ type: NEWPOST_REQUEST });
  try {
    const { data } = await axios.post('/api/v1/posts/', postData);
    dispatch({
      type: NEWPOST_SUCCESS,
      payload: data.data,
    });

  } catch (error) {
    console.log(error)
    const displayErr = error.response.data.error.split(',')[0];
    dispatch({ type: NEWPOST_FAILURE, payload: displayErr });
  }
};

export const getAllPosts = () => async (dispatch) => {
  dispatch({ type: GET_ALL_REQUEST });
  try {
    const { data } = await axios.get('/api/v1/posts/');
    dispatch({
      type: GET_ALL,
      payload: data.data,
    });

  } catch (error) {
    console.log(error)
    const displayErr = error.response.data.error
    dispatch({ type: GET_ALL_FAILURE, payload: displayErr });
  }
};