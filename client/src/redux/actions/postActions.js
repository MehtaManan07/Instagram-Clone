import axios from 'axios';

import * as types  from '../types';

export const newPost = (postData) => async (dispatch) => {
  dispatch({ type: types.NEWPOST_REQUEST });
  try {
    const { data } = await axios.post('/api/v1/posts/', postData);
    dispatch({
      type: types.NEWPOST_SUCCESS,
      payload: data.data,
    });
  } catch (error) {
    console.log(error);
    const displayErr = error.response.data.error.split(',')[0];
    dispatch({ type: types.NEWPOST_FAILURE, payload: displayErr });
  }
};

export const getAllPosts = () => async (dispatch) => {
  dispatch({ type: types.GET_ALL_REQUEST });
  try {
    const { data } = await axios.get('/api/v1/posts/');
    dispatch({
      type: types.GET_ALL_SUCCESS,
      payload: data.data,
    });
  } catch (error) {
    console.log(error);
    const displayErr = error.response.data.error;
    dispatch({ type: types.GET_ALL_FAILURE, payload: displayErr });
  }
};

export const likePost = (postId) => async (dispatch) => {
  dispatch({ type: types.LIKEPOST_REQUEST });
  try {
    const { data } = await axios.put(`/api/v1/posts/like/${postId}`);
    dispatch({
      type: types.LIKEPOST_SUCCESS,
      payload: { postId, likes: data.data.likes },
    });
  } catch (error) {
    console.log(error);
    const displayErr = error.response.data.error;
    dispatch({ type: types.LIKEPOST_FAILURE, payload: displayErr });
  }
};

export const unlikePost = (postId) => async (dispatch) => {
  console.log('poicha bhai')
  dispatch({ type: types.UNLIKEPOST_REQUEST });
  try {
    const { data } = await axios.put(`/api/v1/posts/unLike/${postId}`);
    dispatch({
      type: types.UNLIKEPOST_SUCCESS,
      payload: { postId, likes: data.data.likes },
    });
  } catch (error) {
    console.log(error);
    const displayErr = error.response.data.error;
    dispatch({ type: types.UNLIKEPOST_FAILURE, payload: displayErr });
  }
};
