import {
  LOGIN_FAILURE,
  LOGIN_SUCCESS,
  LOGIN_REQUEST,
  SIGNUP_FAILURE,
  SIGNUP_SUCCESS,
  SIGNUP_REQUEST,
} from '../types';
import axios from 'axios'
export const signup = userData => async dispatch => {
    dispatch({ type: SIGNUP_REQUEST })
    try {
        const { data } = await axios.post(`/api/v1/auth/signup`, userData)
        console.log(data)
        dispatch({ type: SIGNUP_SUCCESS, payload: data.data })
    } catch (error) {
        const displayErr = error.response.data.error.split(',')[0]
        dispatch({
            type: SIGNUP_FAILURE,
            payload: displayErr
        })
    }
}