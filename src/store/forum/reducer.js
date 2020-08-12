import * as actionTypes from './actionTypes';

const initialState = {
  forums: null,
  gettingUnpinnedThreads: false,
  unpinnedThreads: null,
  gettingPinnedThreads: false,
  pinnedThreads: null,
  currentThread: null,
  replies: null,
  gettingReplies: false,
  userProfile: null,
  gettingUserThreads: false,
  userThreads: null,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_ALL_FORUMS:
      return {
        ...state,
        forums: action.forums,
      };

    case actionTypes.GET_UNPINNED_THREADS_START:
      return {
        ...state,
        gettingUnpinnedThreads: true,
        unpinnedThreads: null,
      };
    case actionTypes.GET_UNPINNED_THREADS_SUCCESS:
      return {
        ...state,
        gettingUnpinnedThreads: false,
        unpinnedThreads: action.unpinnedThreads,
      };
    case actionTypes.GET_UNPINNED_THREADS_FAILED:
      return {
        ...state,
        gettingUnpinnedThreads: false,
      };

    case actionTypes.GET_PINNED_THREADS_START:
      return {
        ...state,
        gettingPinnedThreads: true,
        pinnedThreads: null,
      };
    case actionTypes.GET_PINNED_THREADS_SUCCESS:
      return {
        ...state,
        gettingPinnedThreads: false,
        pinnedThreads: action.pinnedThreads,
      };
    case actionTypes.GET_PINNED_THREADS_FAILED:
      return {
        ...state,
        gettingPinnedThreads: false,
      };

    case actionTypes.GET_USER_THREADS_START:
      return {
        ...state,
        gettingUserThreads: true,
        userThreads: null,
      };
    case actionTypes.GET_USER_THREADS_SUCCESS:
      return {
        ...state,
        gettingUserThreads: false,
        userThreads: action.userThreads,
      };
    case actionTypes.GET_USER_THREADS_FAILED:
      return {
        ...state,
        gettingUserThreads: false,
      };

    case actionTypes.GET_REPLIES_START:
      return {
        ...state,
        gettingReplies: true,
        replies: null,
      };
    case actionTypes.GET_REPLIES_SUCCESS:
      return {
        ...state,
        gettingReplies: false,
        replies: action.replies,
      };
    case actionTypes.GET_REPLIES_FAILED:
      return {
        ...state,
        gettingReplies: false,
      };

    case actionTypes.CREATE_REPLY_START:
      return {
        ...state,
        creatingReply: true,
      };
    case actionTypes.CREATE_REPLY_SUCCESS:
      let replies = state.replies || [];
      return {
        ...state,
        creatingReply: false,
        replies: [action.reply, ...replies],
      };
    case actionTypes.CREATE_REPLY_FAILED:
      return {
        ...state,
        creatingReply: false,
      };

    case actionTypes.CREATE_THREAD_START:
      return {
        ...state,
        creatingThread: true,
        currentThread: null,
      };
    case actionTypes.CREATE_THREAD_SUCCESS:
      return {
        ...state,
        creatingThread: false,
        currentThread: action.currentThread,
      };
    case actionTypes.CREATE_THREAD_FAILED:
      return {
        ...state,
        creatingThread: false,
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

    default:
      return state;
  }
};

export default reducer;
