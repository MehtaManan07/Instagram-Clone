// There is no seperate commentReducer. The reducers for this action file are in postReducer.

import axios from 'axios';
import * as types from '../types';

export const addComment = (postId, text) => async (dispatch) => {
  try {
    const { data } = await axios.post(`/api/v1/posts/${postId}/comments`, {
      text,
    });
    console.log(data)
    dispatch({
      type: types.COMMENT_SUCCESS,
      payload: { postId, comments: data.data.comments },
    });
  } catch (error) {
    console.log(error.response);
    const displayErr = error.response.data.error;
    dispatch({ type: types.COMMENT_FAILURE, payload: displayErr });
  }
};

export const likeComment = (id) => async (dispatch) => {
  try {
    const { data } = await axios.put(`/api/v1/comments/like/${id}`);
    console.log(data)
    console.log(id)
    dispatch({
      type: types.LIKE_COMMENT_SUCCESS,
      payload: {comment: data.data, id}
    });
  } catch (error) {
    console.log(error);
    const displayErr = error.response.data.error;
    dispatch({ type: types.LIKE_COMMENT_FAILURE, payload: displayErr });
  }
};

export const unlikeComment = (id) => async (dispatch) => {
  try {
    const { data } = await axios.put(`/api/v1/comments/unLike/${id}`);
    console.log(data)
    dispatch({
      type: types.UNLIKE_COMMENT_SUCCESS,
      payload: {comment: data.data, id}
    });
  } catch (error) {
    console.log(error);
    const displayErr = error.response.data.error;
    dispatch({ type: types.UNLIKE_COMMENT_FAILURE, payload: displayErr });
  }
};
