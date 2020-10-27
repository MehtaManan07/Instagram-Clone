import * as types from '../types';

const initialState = {
  loading: false,
  profile: null,
  error: null,
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case types.GET_PROFILE_REQUEST:
      return { ...state, loading: true };

    case types.FOLLOW_SUCCESS:
    case types.UNFOLLOW_SUCCESS:
      return {
        ...state,
        loading: false,
        profile: {
          ...state.profile,
          followers: payload.followers,
          following: payload.following,
        },
      };

    case types.GET_PROFILE_SUCCESS:
      console.log(state)
      return { ...state, profile: payload, error: null, loading: false };

    case types.GET_PROFILE_FAILURE:
    case types.FOLLOW_FAILURE:
    case types.UNFOLLOW_FAILURE:
      return { ...state, error: payload, loading: false };
    default:
      return state;
  }
};
