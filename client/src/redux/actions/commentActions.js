// There is no seperate commentReducer. The reducers for this action file are in postReducer.

import axios from 'axios';
import * as types from '../types';

export const addComment = (postId, text) => async (dispatch) => {
  try {
    const { data } = await axios.post(`/api/v1/posts/${postId}/comments`, {
      text,
    });
    dispatch({
      type: types.COMMENT_SUCCESS,
      payload: data.data,
    });
  } catch (error) {
    console.log(error);
    const displayErr = error.response.data.error;
    dispatch({ type: types.COMMENT_FAILURE, payload: displayErr });
  }
};
