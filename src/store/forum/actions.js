import axios from '../../axiosAPI';
import * as actionTypes from './actionTypes';
import { history } from '../../index';

export const getAllForums = () => {
  return (dispatch) => {
    return axios.get('/forums').then((res) => {
      dispatch({
        type: actionTypes.GET_ALL_FORUMS,
        forums: res.data.forums,
      });
    });
  };
};

export const getUnpinnedThreads = (forumId) => {
  return (dispatch) => {
    dispatch({ type: actionTypes.GET_UNPINNED_THREADS_START });
    return axios.get(`/forums/${forumId}/threads?pinned=false`).then((res) => {
      if (res.data.threads) {
        dispatch({
          type: actionTypes.GET_UNPINNED_THREADS_SUCCESS,
          unpinnedThreads: res.data.threads,
        });
      } else {
        dispatch({ type: actionTypes.GET_UNPINNED_THREADS_FAILED });
      }
    });
  };
};

export const getPinnedThreads = (forumId) => {
  return (dispatch) => {
    dispatch({ type: actionTypes.GET_PINNED_THREADS_START });
    return axios.get(`/forums/${forumId}/threads?pinned=true`).then((res) => {
      console.log(res);
      if (res.data.threads) {
        dispatch({
          type: actionTypes.GET_PINNED_THREADS_SUCCESS,
          pinnedThreads: res.data.threads,
        });
      } else {
        dispatch({ type: actionTypes.GET_PINNED_THREADS_FAILED });
      }
    });
  };
};

export const getReplies = (threadId) => {
  return (dispatch) => {
    dispatch({ type: actionTypes.GET_REPLIES_START });
    return axios.get(`/threads/${threadId}/replies`).then((res) => {
      if (res.data.replies) {
        dispatch({
          type: actionTypes.GET_REPLIES_SUCCESS,
          replies: res.data.replies,
        });
      } else {
        dispatch({ type: actionTypes.GET_REPLIES_FAILED });
      }
    });
  };
};

export const getThread = (threadSlug) => {
  return (dispatch) => {
    dispatch({ type: actionTypes.GET_THREAD_START });
    return axios.get(`/threads?slug=${threadSlug}`).then((res) => {
      if (res.data.thread) {
        dispatch({
          type: actionTypes.GET_THREAD_SUCCESS,
          currentThread: res.data.thread,
        });
        dispatch(getReplies(res.data.thread._id));
      } else {
        dispatch({ type: actionTypes.GET_THREAD_FAILED });
      }
    });
  };
};

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
    return axios.post(`/threads`, thread).then((res) => {
      if (res.data.thread) {
        dispatch({
          type: actionTypes.CREATE_THREAD_SUCCESS,
          currentThread: res.data.thread,
        });
        history.push(`/${forum.slug}/thread/${res.data.thread.slug}`);
      } else {
        dispatch({ type: actionTypes.CREATE_THREAD_FAILED });
      }
    });
  };
};

export const createReply = (user, thread, content) => {
  return (dispatch) => {
    dispatch({ type: actionTypes.CREATE_REPLY_START });
    const reply = {
      user,
      thread,
      content,
    };

    return axios.post(`/replies`, reply).then((res) => {
      console.log(res.data.reply);
      if (res.data.reply) {
        dispatch({
          type: actionTypes.CREATE_REPLY_SUCCESS,
          reply: res.data.reply,
        });
      } else {
        dispatch({ type: actionTypes.CREATE_REPLY_FAILED });
      }
    });
  };
};

export const favoriteThread = (userId, threadId) => {
  return (dispatch) => {
    const user = { _id: userId };
    return axios.post(`/threads/${threadId}/favorites`, user).then((res) => {
      dispatch({
        type: actionTypes.SET_THREAD_FAVORITES,
        favorites: res.data.favorites,
      });
    });
  };
};

export const unfavoriteThread = (userId, threadId) => {
  return (dispatch) => {
    return axios
      .delete(`/threads/${threadId}/favorites/${userId}`)
      .then((res) => {
        dispatch({
          type: actionTypes.SET_THREAD_FAVORITES,
          favorites: res.data.favorites,
        });
      });
  };
};

export const deleteThread = (forumSlug, threadId) => {
  return (dispatch) => {
    dispatch({ type: actionTypes.DELETE_THREAD_START });
    return axios.delete(`/threads/${threadId}`).then((res) => {
      if (res.data.success) {
        dispatch({ type: actionTypes.DELETE_THREAD_SUCCESS });
        history.push(`/${forumSlug}`);
      } else {
        dispatch({ type: actionTypes.DELETE_THREAD_FAILED });
      }
    });
  };
};

export const getUserThreads = (username) => {
  return (dispatch) => {
    dispatch({ type: actionTypes.GET_USER_THREADS_START });
    return axios.get(`/users/${username}/threads`).then((res) => {
      if (res.data.threads) {
        dispatch({
          type: actionTypes.GET_USER_THREADS_SUCCESS,
          userThreads: res.data.threads,
        });
      } else {
        dispatch({ type: actionTypes.GET_USER_THREADS_FAILED });
      }
    });
  };
};

export const getUserProfile = (username) => {
  return (dispatch) => {
    return axios.get(`/users/${username}`).then((res) => {
      dispatch({
        type: actionTypes.GET_USER_PROFILE,
        userProfile: res.data.user,
      });
    });
  };
};

export const setCurrentThread = (currentThread) => {
  return {
    type: actionTypes.SET_CURRENT_THREAD,
    currentThread: currentThread,
  };
};
