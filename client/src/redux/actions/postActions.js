import axios from 'axios';

import { NEWPOST_FAILURE, NEWPOST_REQUEST, NEWPOST_SUCCESS } from '../types';

export const newPost = (postData) => async (dispatch) => {
  dispatch({ type: NEWPOST_REQUEST });
  try {
    const { data } = axios.post('/api/v1/posts/', postData);
    dispatch({ type: NEWPOST_SUCCESS, payload: data.data });
  } catch (error) {
    const displayErr = error.response.data.error.split(',')[0];
    dispatch({ type: NEWPOST_FAILURE, payload: displayErr });
  }
};
