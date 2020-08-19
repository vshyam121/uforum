import * as actionTypes from './actionTypes';

const initialState = {
  forums: null,
  gettingForums: false,
  getForumsError: null,

  creatingForum: false,
  createForumError: null,
  deletingForumId: null,
  deleteForumError: null,

  gettingUnpinnedThreads: false,
  unpinnedThreads: null,
  getUnpinnedThreadsError: null,

  gettingPinnedThreads: false,
  pinnedThreads: null,
  getPinnedThreadsError: null,

  gettingUserProfile: false,
  userProfile: null,
  getUserProfileError: null,

  gettingUserThreads: false,
  userThreads: null,
  getUserThreadsError: null,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.CREATE_FORUM_START:
      return {
        ...state,
        creatingForum: true,
        createForumError: null,
      };
    case actionTypes.CREATE_FORUM_SUCCESS:
      return {
        ...state,
        creatingForum: false,
        createdForum: true,
        forums: action.forums,
      };
    case actionTypes.CREATE_FORUM_FAILED:
      return {
        ...state,
        creatingForum: false,
        createForumError: action.error,
      };
    case actionTypes.CREATE_FORUM_RESET:
      return {
        ...state,
        createdForum: false,
      };

    case actionTypes.DELETE_FORUM_START:
      return {
        ...state,
        deletingForumId: action.deletingForumId,
        deleteForumError: null,
      };
    case actionTypes.DELETE_FORUM_SUCCESS:
      let forums = state.forums.filter(
        (forum) => forum._id !== action.deletedForumId
      );
      return {
        ...state,
        deletingForumId: null,
        forums: forums,
      };
    case actionTypes.DELETE_FORUM_FAILED:
      return {
        ...state,
        deletingForumId: null,
        deleteForumError: action.error,
      };

    case actionTypes.GET_ALL_FORUMS_START:
      return {
        ...state,
        getForumsError: null,
        gettingForums: true,
      };
    case actionTypes.GET_ALL_FORUMS_SUCCESS:
      return {
        ...state,
        forums: action.forums,
        gettingForums: false,
      };
    case actionTypes.GET_ALL_FORUMS_FAILED:
      return {
        ...state,
        gettingForums: false,
        getForumsError: action.error,
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
        getUnpinnedThreadsError: action.error,
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
        getPinnedThreadsError: action.error,
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
        getUserThreadsError: action.error,
      };

    case actionTypes.GET_USER_PROFILE_START:
      return {
        ...state,
        gettingUserProfile: true,
        getUserProfileError: null,
      };
    case actionTypes.GET_USER_PROFILE_SUCCESS:
      return {
        ...state,
        gettingUserProfile: false,
        userProfile: action.userProfile,
      };
    case actionTypes.GET_USER_PROFILE_FAILED:
      return {
        ...state,
        gettingUserProfile: false,
        getUserProfileError: action.error,
      };

    default:
      return state;
  }
};

export default reducer;
