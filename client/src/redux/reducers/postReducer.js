import { NEWPOST_FAILURE, NEWPOST_REQUEST, NEWPOST_SUCCESS } from '../types';

const initialState = {
  posts: [],
  post: null,
  loading: false,
  error: null,
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case NEWPOST_REQUEST:
      return { ...state, loading: true };

    case NEWPOST_SUCCESS:
      return {
        ...state,
        posts: [payload, ...state.posts],
        loading: false,
        error: null,
      };
    case NEWPOST_FAILURE:
        return {
            ...state, error: payload, loading: false
        }
    default:
      return state;
  }
};
