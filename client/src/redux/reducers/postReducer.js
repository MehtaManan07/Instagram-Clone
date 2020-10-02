import * as types from '../types';

const initialState = {
  posts: [],
  post: null,
  loading: false,
  error: null,
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case types.NEWPOST_REQUEST:
    case types.GET_ALL_REQUEST:
    case types.GET_POST_REQUEST:
      return { ...state, loading: true };

    case types.GET_ALL_SUCCESS:
      return { ...state, error: null, posts: payload, loading: false };

    case types.GET_POST_SUCCESS:
      return {
        ...state,
        post: payload,
        loading: false,
        error: null,
      };

    case types.NEWPOST_SUCCESS:
      return {
        ...state,
        posts: [payload, ...state.posts],
        loading: false,
        error: null,
      };

    case types.COMMENT_SUCCESS:
      return {
        ...state,
        posts: state.posts.map((post) =>
          post._id === payload.postId
            ? { ...post, comments: payload.comments }
            : post
        ),
        post: { ...state.post, comments: payload.comments },
        loading: false,
      };

    case types.LIKEPOST_SUCCESS:
    case types.UNLIKEPOST_SUCCESS:
      return {
        ...state,
        posts: state.posts.map((post) =>
          post._id === payload.postId ? { ...post, likes: payload.likes } : post
        ),
        post: { ...state.post, likes: payload.likes },
        loading: false,
      };

    case types.LIKE_COMMENT_SUCCESS:
    case types.UNLIKE_COMMENT_SUCCESS:
      console.log(state.post.comments);
      return {
        ...state,
        
        loading: false,
      };

    case types.NEWPOST_FAILURE:
    case types.GET_ALL_FAILURE:
    case types.GET_POST_FAILURE:
    case types.LIKEPOST_FAILURE:
    case types.UNLIKEPOST_FAILURE:
    case types.COMMENT_FAILURE:
    case types.LIKE_COMMENT_FAILURE:
    case types.UNLIKE_COMMENT_FAILURE:
      return {
        ...state,
        error: payload,
        loading: false,
      };
    default:
      return state;
  }
};
