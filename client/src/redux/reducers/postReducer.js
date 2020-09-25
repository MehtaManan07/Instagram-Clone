import { GET_ALL_FAILURE, GET_ALL_REQUEST, GET_ALL_SUCCESS, NEWPOST_FAILURE, NEWPOST_REQUEST, NEWPOST_SUCCESS } from '../types';

const initialState = {
  posts: [],
  post: null,
  loading: false,
  error: null,
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case NEWPOST_REQUEST:
    case GET_ALL_REQUEST:
      return { ...state, loading: true };
    
    case GET_ALL_SUCCESS:
      return { ...state, error: null, posts: payload, loading: false }

    case NEWPOST_SUCCESS:
      return {
        ...state,
        posts: [payload, ...state.posts],
        loading: false,
        error: null,
      };
    case NEWPOST_FAILURE:
    case GET_ALL_FAILURE:
      return {
        ...state,
        error: payload,
        loading: false,
      };
    default:
      return state;
  }
};
