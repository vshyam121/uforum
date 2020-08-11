import * as actionTypes from './actionTypes';

const initialState = {
  forums: null,
  threads: null,
  currentThread: null,
  userThreads: null,
  thread: null,
  replies: null,
  pinnedThreads: null,
  userProfile: null,
  currentForumId: null,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_ALL_FORUMS:
      return {
        ...state,
        forums: action.forums,
      };

    case actionTypes.CLEAR_UNPINNED_THREADS:
      return {
        ...state,
        threads: null,
      };

    case actionTypes.GET_UNPINNED_THREADS_FOR_FORUM:
      return {
        ...state,
        threads: action.threads,
      };

    case actionTypes.CLEAR_PINNED_THREADS:
      return {
        ...state,
        pinnedThreads: null,
      };

    case actionTypes.GET_PINNED_THREADS_FOR_FORUM:
      return {
        ...state,
        pinnedThreads: action.pinnedThreads,
      };

    case actionTypes.CLEAR_USER_THREADS:
      return {
        ...state,
        userThreads: null,
      };

    case actionTypes.GET_USER_THREADS:
      return {
        ...state,
        userThreads: action.userThreads,
      };

    case actionTypes.GET_REPLIES_FOR_THREAD:
      return {
        ...state,
        replies: action.replies,
      };

    case actionTypes.CREATE_REPLY:
      let replies = state.replies || [];
      return {
        ...state,
        replies: [action.reply, ...replies],
      };

    case actionTypes.SET_CURRENT_THREAD:
      return {
        ...state,
        currentThread: action.currentThread,
      };

    case actionTypes.GET_THREAD_START:
      return {
        ...state,
        gettingThread: true,
        currentThread: null,
      };
    case actionTypes.GET_THREAD_SUCCESS:
      return {
        ...state,
        gettingThread: false,
        currentThread: action.currentThread,
      };
    case actionTypes.GET_THREAD_FAILED:
      return {
        ...state,
        gettingThread: false,
        currentThread: null,
      };

    case actionTypes.SET_THREAD_FAVORITES:
      return {
        ...state,
        currentThread: {
          ...state.currentThread,
          favorites: action.favorites,
        },
      };

    case actionTypes.GET_USER_PROFILE:
      return {
        ...state,
        userProfile: action.userProfile,
      };

    case actionTypes.DELETE_THREAD_START:
      return {
        ...state,
        deletingThread: true,
      };

    case actionTypes.DELETE_THREAD_SUCCESS:
      return {
        ...state,
        deletingThread: false,
        deletedThread: true,
      };

    case actionTypes.DELETE_THREAD_FAILED:
      return {
        ...state,
        deletingThread: false,
        deletedThread: false,
      };

    case actionTypes.DELETE_THREAD_REDIRECT:
      return {
        ...state,
        deletedThread: false,
      };
    default:
      return state;
  }
};

export default reducer;
