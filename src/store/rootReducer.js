import { combineReducers } from 'redux';
import authReducer from './auth/reducer';
import forumReducer from './forum/reducer';
import uiReducer from './ui/reducer';

export default combineReducers({
  auth: authReducer,
  forum: forumReducer,
  ui: uiReducer,
});
