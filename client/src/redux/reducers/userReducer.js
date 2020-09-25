import * as types from '../types'

const initialState = {
  loading: false,
  profile: null,
  error: null,
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case types.GET_PROFILE_REQUEST:
      return { ...state, loading: true };
    case types.GET_PROFILE_SUCCESS:
        return { ...state, error: null, loading: false, profile: payload }
    case types.GET_PROFILE_FAILURE:
        return { ...state, error: payload, loading: false }
    default:
      return state;
  }
};
