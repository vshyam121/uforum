import * as actionTypes from './actionTypes';

const initialState = {
  currentThread: null,

  creatingThread: false,
  createThreadError: null,

  gettingThread: false,
  getThreadError: null,
  doneGettingThread: false,

  deletingThread: false,
  deleteThreadError: null,

  replies: null,
  creatingReply: false,
  createReplyError: null,

  deletingReplyId: null,
  deleteReply: null,

  gettingReplies: false,
  getRepliesError: null,

  togglingPin: false,
  togglePinError: null,

  togglingFavorite: false,
  toggleFavoriteError: null,
};

const reducer = (state = initialState, action) => {
  let replies = null;
  switch (action.type) {
    case actionTypes.CREATE_THREAD_START:
      return {
        ...state,
        creatingThread: true,
        currentThread: null,
        createThreadError: null,
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
        createThreadError: action.error,
      };
    case actionTypes.CREATE_THREAD_RESET:
      return {
        ...state,
        createThreadError: null,
      };

    case actionTypes.GET_THREAD_START:
      return {
        ...state,
        gettingThread: true,
        doneGettingThread: false,
        currentThread: null,
        getThreadError: null,
      };
    case actionTypes.GET_THREAD_SUCCESS:
      return {
        ...state,
        gettingThread: false,
        doneGettingThread: true,
        currentThread: action.currentThread,
      };
    case actionTypes.GET_THREAD_FAILED:
      return {
        ...state,
        gettingThread: false,
        doneGettingThread: true,
        currentThread: null,
        getThreadError: action.error,
      };

    case actionTypes.DELETE_THREAD_START:
      return {
        ...state,
        deletingThread: true,
        deleteThreadError: null,
      };
    case actionTypes.DELETE_THREAD_SUCCESS:
      return {
        ...state,
        deletingThread: false,
      };
    case actionTypes.DELETE_THREAD_FAILED:
      return {
        ...state,
        deletingThread: false,
        deleteThreadError: action.error,
      };

    case actionTypes.CREATE_REPLY_START:
      return {
        ...state,
        creatingReply: true,
        createReplyError: null,
      };
    case actionTypes.CREATE_REPLY_SUCCESS:
      replies = state.replies || [];
      return {
        ...state,
        creatingReply: false,
        replies: [action.reply, ...replies],
      };
    case actionTypes.CREATE_REPLY_FAILED:
      return {
        ...state,
        creatingReply: false,
        createReplyError: action.error,
      };

    case actionTypes.GET_REPLIES_START:
      return {
        ...state,
        gettingReplies: true,
        replies: null,
        getRepliesError: null,
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
        getRepliesError: action.error,
      };

    case actionTypes.DELETE_REPLY_START:
      return {
        ...state,
        deletingReplyId: action.deletingReplyId,
        deleteReplyError: null,
      };
    case actionTypes.DELETE_REPLY_SUCCESS:
      replies = state.replies.filter(
        (reply) => reply._id !== action.deletedReplyId
      );
      return {
        ...state,
        replies: replies,
        deletingReplyId: null,
      };
    case actionTypes.DELETE_REPLY_FAILED:
      return {
        ...state,
        deleteReplyError: action.error,
      };

    case actionTypes.SET_CURRENT_THREAD:
      return {
        ...state,
        currentThread: action.currentThread,
      };

    case actionTypes.SET_THREAD_FAVORITES_START:
      return {
        ...state,
        togglingFavorite: true,
        toggleFavoriteError: null,
      };
    case actionTypes.SET_THREAD_FAVORITES_SUCCESS:
      return {
        ...state,
        currentThread: {
          ...state.currentThread,
          favorites: action.favorites,
        },
        togglingFavorite: false,
      };
    case actionTypes.SET_THREAD_FAVORITES_FAILED:
      return {
        ...state,
        togglingFavorite: false,
        toggleFavoriteError: action.error,
      };

    case actionTypes.SET_PINNED_STATUS_START:
      return {
        ...state,
        togglingPin: true,
        togglePinError: null,
      };
    case actionTypes.SET_PINNED_STATUS_SUCCESS:
      return {
        ...state,
        togglingPin: false,
        currentThread: action.currentThread,
      };
    case actionTypes.SET_PINNED_STATUS_FAILED:
      return {
        ...state,
        togglingPin: false,
        togglePinError: action.error,
      };

    case actionTypes.THREAD_ERRORS_RESET:
      return {
        ...state,
        deleteReplyError: null,
        setPinnedStatusError: null,
        setFavoritesError: null,
        deletingReplyId: null,
        createReplyError: null,
        togglePinError: null,
        toggleFavoriteError: null,
        deleteThreadError: null,
      };

    default:
      return state;
  }
};

export default reducer;
