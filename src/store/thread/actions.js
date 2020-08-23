import * as actionTypes from './actionTypes';
import axios from '../../axiosAPI';
import { history } from '../../index';

export const createThread = (forum, userId, title, content, tags) => {
  return (dispatch) => {
    dispatch({ type: actionTypes.CREATE_THREAD_START });
    const thread = {
      forum: forum._id,
      user: userId,
      title,
      content,
      tags,
    };
    return axios
      .post('/threads', thread)
      .then((res) => {
        if (res.data.thread) {
          dispatch({
            type: actionTypes.CREATE_THREAD_SUCCESS,
            currentThread: res.data.thread,
          });
          history.push(`/${forum.slug}/thread/${res.data.thread.slug}`);
        } else {
          dispatch(createThreadFailed());
        }
      })
      .catch((err) => {
        dispatch(createThreadFailed(err));
      });
  };
};

export const createThreadFailed = (err) => {
  return {
    type: actionTypes.CREATE_THREAD_FAILED,
    error:
      (err && err.message) ||
      'Unable to create thread. Please try again later.',
  };
};

export const resetCreateThreadError = () => {
  return {
    type: actionTypes.CREATE_THREAD_RESET,
  };
};

export const getThread = (threadSlug) => {
  return (dispatch) => {
    dispatch({ type: actionTypes.GET_THREAD_START });
    return axios
      .get(`/threads?slug=${threadSlug}`)
      .then((res) => {
        const threads = res.data.threads;
        if (threads && threads.length > 0) {
          dispatch({
            type: actionTypes.GET_THREAD_SUCCESS,
            currentThread: threads[0],
          });
          dispatch(getReplies(threads[0]._id));
        } else {
          dispatch(getThreadFailed());
        }
      })
      .catch((err) => {
        dispatch(getThreadFailed(err));
      });
  };
};

export const getThreadFailed = (err) => {
  return {
    type: actionTypes.GET_THREAD_FAILED,
    error: (err && err.message) || 'Thread not found.',
  };
};

export const deleteThread = (forumSlug, threadId) => {
  return (dispatch) => {
    dispatch({ type: actionTypes.DELETE_THREAD_START });
    return axios
      .delete(`/threads/${threadId}`)
      .then((res) => {
        if (res.data.success) {
          dispatch({ type: actionTypes.DELETE_THREAD_SUCCESS });
          history.push(`/${forumSlug}`);
        } else {
          dispatch(setDeleteThreadFailed());
        }
      })
      .catch((err) => {
        dispatch(setDeleteThreadFailed(err));
      });
  };
};

export const setDeleteThreadFailed = (err) => {
  return {
    type: actionTypes.DELETE_THREAD_FAILED,
    error:
      (err && err.message) ||
      'Unable to delete thread. Please try again later.',
  };
};

export const createReply = (forum, user, threadId, content) => {
  return (dispatch) => {
    dispatch({ type: actionTypes.CREATE_REPLY_START });
    const reply = {
      forum,
      user,
      content,
    };

    return axios
      .post(`/threads/${threadId}/replies`, reply)
      .then((res) => {
        if (res.data.reply) {
          dispatch({
            type: actionTypes.CREATE_REPLY_SUCCESS,
            reply: res.data.reply,
          });
        } else {
          dispatch(createReplyFailed());
        }
      })
      .catch((err) => {
        dispatch(createReplyFailed(err));
      });
  };
};

export const createReplyFailed = (err) => {
  return {
    type: actionTypes.CREATE_REPLY_FAILED,
    error:
      (err && err.message) || 'Unable to create reply. Please try again later.',
  };
};

export const getReplies = (threadId) => {
  return (dispatch) => {
    dispatch({ type: actionTypes.GET_REPLIES_START });
    return axios
      .get(`/threads/${threadId}/replies`)
      .then((res) => {
        if (res.data.replies) {
          dispatch({
            type: actionTypes.GET_REPLIES_SUCCESS,
            replies: res.data.replies,
          });
        } else {
          dispatch(getRepliesFailed());
        }
      })
      .catch((err) => {
        dispatch(getRepliesFailed(err));
      });
  };
};

export const getRepliesFailed = (err) => {
  return {
    type: actionTypes.GET_REPLIES_FAILED,
    error:
      (err && err.message) || 'Unable to get replies. Please try again later.',
  };
};

export const deleteReply = (threadId, replyId) => {
  return (dispatch) => {
    dispatch({
      type: actionTypes.DELETE_REPLY_START,
      deletingReplyId: replyId,
    });
    return axios
      .delete(`/threads/${threadId}/replies/${replyId}`)
      .then((res) => {
        if (res.data.success) {
          dispatch({
            type: actionTypes.DELETE_REPLY_SUCCESS,
            deletedReplyId: replyId,
          });
        } else {
          dispatch(deleteReplyFailed());
        }
      })
      .catch((err) => {
        dispatch(deleteReplyFailed(err));
      });
  };
};

export const deleteReplyFailed = (err) => {
  return {
    type: actionTypes.DELETE_REPLY_FAILED,
    error:
      (err && err.message) || 'Unable to delete reply. Please try again later.',
  };
};

export const favoriteThread = (userId, threadId) => {
  return (dispatch) => {
    dispatch({ type: actionTypes.SET_THREAD_FAVORITES_START });
    const user = { _id: userId };
    return axios
      .post(`/threads/${threadId}/favorites`, user)
      .then((res) => {
        if (res.data.favorites) {
          dispatch({
            type: actionTypes.SET_THREAD_FAVORITES_SUCCESS,
            favorites: res.data.favorites,
          });
        } else {
          dispatch(favoriteThreadFailed());
        }
      })
      .catch((err) => {
        dispatch(favoriteThreadFailed(err));
      });
  };
};

export const favoriteThreadFailed = (err) => {
  return {
    type: actionTypes.SET_THREAD_FAVORITES_FAILED,
    error: (err && err.message) || 'Unable to favorite.',
  };
};

export const unfavoriteThread = (userId, threadId) => {
  return (dispatch) => {
    dispatch({ type: actionTypes.SET_THREAD_FAVORITES_START });
    return axios
      .delete(`/threads/${threadId}/favorites/${userId}`)
      .then((res) => {
        if (res.data.favorites) {
          dispatch({
            type: actionTypes.SET_THREAD_FAVORITES_SUCCESS,
            favorites: res.data.favorites,
          });
        } else {
          dispatch(unfavoriteThreadFailed());
        }
      })
      .catch((err) => {
        dispatch(unfavoriteThreadFailed(err));
      });
  };
};

export const unfavoriteThreadFailed = (err) => {
  return {
    type: actionTypes.SET_THREAD_FAVORITES_FAILED,
    error: (err && err.message) || 'Unable to unfavorite.',
  };
};

export const setThreadPinnedStatus = (threadId, pinnedStatus) => {
  return (dispatch) => {
    dispatch({ type: actionTypes.SET_PINNED_STATUS_START });
    const pinned = { pinned: pinnedStatus };
    return axios
      .patch(`/threads/${threadId}`, pinned)
      .then((res) => {
        if (res.data.thread) {
          dispatch({
            type: actionTypes.SET_PINNED_STATUS_SUCCESS,
            currentThread: res.data.thread,
          });
        } else {
          dispatch(setThreadPinnedStatusFailed());
        }
      })
      .catch((err) => {
        dispatch(setThreadPinnedStatusFailed(err));
      });
  };
};

export const setThreadPinnedStatusFailed = (err) => {
  return {
    type: actionTypes.SET_PINNED_STATUS_FAILED,
    error: (err && err.message) || 'Unable to toggle pin.',
  };
};

export const setCurrentThread = (currentThread) => {
  return {
    type: actionTypes.SET_CURRENT_THREAD,
    currentThread: currentThread,
  };
};

export const resetThreadErrors = () => {
  return {
    type: actionTypes.THREAD_ERRORS_RESET,
  };
};
