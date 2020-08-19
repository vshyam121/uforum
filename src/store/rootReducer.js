import { combineReducers } from 'redux';
import authReducer from './auth/reducer';
import feedsReducer from './feeds/reducer';
import threadReducer from './thread/reducer';

export default combineReducers({
  auth: authReducer,
  feeds: feedsReducer,
  thread: threadReducer,
});
