import axios from '../../axiosAPI';
import * as actionTypes from './actionTypes';

export const createForum = (forumName) => {
  return (dispatch) => {
    dispatch({ type: actionTypes.CREATE_FORUM_START });
    const forum = { name: forumName };
    return axios
      .post('/forums', forum)
      .then((res) => {
        if (res.data.forums) {
          dispatch({
            type: actionTypes.CREATE_FORUM_SUCCESS,
            forums: res.data.forums,
          });
        } else {
          dispatch(createForumFailed());
        }
      })
      .catch((err) => {
        dispatch(createForumFailed(err));
      });
  };
};

export const createForumFailed = (err) => {
  return (dispatch) => {
    let error = null;
    if (err) {
      //Check for unique validation error for any field
      if (err.response && err.response.data.error.includes('unique')) {
        error = 'Forum name must be unique.';
      } else if (err.message) {
        error = err.message;
      }
    }
    //Default to general error
    else {
      error = 'Unable to create a forum. Please try again later.';
    }
    dispatch({
      type: actionTypes.CREATE_FORUM_FAILED,
      error: error,
    });
  };
};

export const resetCreateForum = () => {
  return {
    type: actionTypes.CREATE_FORUM_RESET,
  };
};

export const getAllForums = () => {
  return (dispatch) => {
    dispatch({
      type: actionTypes.GET_ALL_FORUMS_START,
    });
    return axios
      .get('/forums')
      .then((res) => {
        if (res.data.forums) {
          dispatch({
            type: actionTypes.GET_ALL_FORUMS_SUCCESS,
            forums: res.data.forums,
          });
        } else {
          dispatch(getAllForumsFailed());
        }
      })
      .catch((err) => {
        dispatch(getAllForumsFailed(err));
      });
  };
};

export const getAllForumsFailed = (err) => {
  return {
    type: actionTypes.GET_ALL_FORUMS_FAILED,
    error:
      (err && err.message) || 'Unable to get forums. Please try again later.',
  };
};

export const deleteForum = (forumId) => {
  return (dispatch) => {
    dispatch({
      type: actionTypes.DELETE_FORUM_START,
      deletingForumId: forumId,
    });
    return axios
      .delete(`/forums/${forumId}`)
      .then((res) => {
        if (res.data.success) {
          dispatch({
            type: actionTypes.DELETE_FORUM_SUCCESS,
            deletedForumId: forumId,
          });
        } else {
          dispatch(deleteForumFailed());
        }
      })
      .catch((err) => {
        dispatch(deleteForumFailed(err));
      });
  };
};

export const deleteForumFailed = (err) => {
  return {
    type: actionTypes.DELETE_FORUM_FAILED,
    error:
      (err && err.message) || 'Unable to delete forum. Please try again later.',
  };
};

export const getUnpinnedThreads = (forumId, sortingMethod = 'date') => {
  return (dispatch) => {
    dispatch({ type: actionTypes.GET_UNPINNED_THREADS_START });
    let url = `/forums/${forumId}/threads?pinned=false`;

    //Default to sort by date
    if (sortingMethod === 'date') {
      url += '&sorting_method=date';
    }
    //Otherwise, sort by popularity
    else if (sortingMethod === 'popularity') {
      url += '&sorting_method=popularity';
    }
    return axios
      .get(url)
      .then((res) => {
        if (res.data.threads) {
          dispatch({
            type: actionTypes.GET_UNPINNED_THREADS_SUCCESS,
            unpinnedThreads: res.data.threads,
          });
        } else {
          dispatch(getUnpinnedThreadsFailed());
        }
      })
      .catch((err) => {
        dispatch(getUnpinnedThreadsFailed(err));
      });
  };
};

export const getUnpinnedThreadsFailed = (err) => {
  return {
    type: actionTypes.GET_UNPINNED_THREADS_FAILED,
    error:
      (err && err.message) || 'Unable to get threads. Please try again later.',
  };
};

export const getPinnedThreads = (forumId) => {
  return (dispatch) => {
    dispatch({ type: actionTypes.GET_PINNED_THREADS_START });
    return axios
      .get(`/forums/${forumId}/threads?pinned=true`)
      .then((res) => {
        if (res.data.threads) {
          dispatch({
            type: actionTypes.GET_PINNED_THREADS_SUCCESS,
            pinnedThreads: res.data.threads,
          });
        } else {
          dispatch(getPinnedThreadsFailed());
        }
      })
      .catch((err) => {
        dispatch(getPinnedThreadsFailed(err));
      });
  };
};

export const getPinnedThreadsFailed = (err) => {
  return {
    type: actionTypes.GET_PINNED_THREADS_FAILED,
    error:
      (err && err.message) ||
      'Unable to get pinned threads. Please try again later.',
  };
};

export const getUserThreads = (username) => {
  return (dispatch) => {
    dispatch({ type: actionTypes.GET_USER_THREADS_START });
    return axios
      .get(`/users/${username}/threads`)
      .then((res) => {
        if (res.data.threads) {
          dispatch({
            type: actionTypes.GET_USER_THREADS_SUCCESS,
            userThreads: res.data.threads,
          });
        } else {
          dispatch(getUserThreadsFailed());
        }
      })
      .catch((err) => {
        dispatch(getUserThreadsFailed(err));
      });
  };
};

export const getUserThreadsFailed = (err) => {
  return {
    type: actionTypes.GET_USER_THREADS_FAILED,
    error:
      (err && err.message) ||
      "Unable to get user's threads. Please try again later.",
  };
};

export const getUserProfile = (username) => {
  return (dispatch) => {
    dispatch({ type: actionTypes.GET_USER_PROFILE_START });
    return axios
      .get(`/users/${username}`)
      .then((res) => {
        if (res.data.user) {
          dispatch({
            type: actionTypes.GET_USER_PROFILE_SUCCESS,
            userProfile: res.data.user,
          });
        } else {
          dispatch(getUserProfileFailed());
        }
      })
      .catch((err) => {
        dispatch(getUserProfileFailed(err));
      });
  };
};

export const getUserProfileFailed = (err) => {
  return {
    type: actionTypes.GET_USER_PROFILE_FAILED,
    error:
      (err && err.message) ||
      'Unable to get user profile. Please try again later.',
  };
};
