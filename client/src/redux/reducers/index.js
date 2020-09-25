import { combineReducers } from 'redux';
import authReducer from './authReducer';
import postReducer from './postReducer';
import userReducer from './userReducer';

const rootReducer = combineReducers({
  auth: authReducer,
  post: postReducer,
  user: userReducer
});

export default rootReducer;
