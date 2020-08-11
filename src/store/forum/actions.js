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

export const clearUnpinnedThreads = () => {
  return {
    type: actionTypes.CLEAR_UNPINNED_THREADS,
  };
};

export const getUnpinnedThreadsForForum = (forumId) => {
  return (dispatch) => {
    return axios.get(`/forums/${forumId}/threads?pinned=false`).then((res) => {
      dispatch({
        type: actionTypes.GET_UNPINNED_THREADS_FOR_FORUM,
        threads: res.data.threads,
      });
    });
  };
};

export const clearPinnedThreads = () => {
  return {
    type: actionTypes.CLEAR_PINNED_THREADS,
  };
};

export const getPinnedThreadsForForum = (forumId) => {
  return (dispatch) => {
    return axios.get(`/forums/${forumId}/threads?pinned=true`).then((res) => {
      console.log(res);
      dispatch({
        type: actionTypes.GET_PINNED_THREADS_FOR_FORUM,
        pinnedThreads: res.data.threads,
      });
    });
  };
};

export const getRepliesForThread = (threadId) => {
  return (dispatch) => {
    return axios.get(`/threads/${threadId}/replies`).then((res) => {
      dispatch({
        type: actionTypes.GET_REPLIES_FOR_THREAD,
        replies: res.data.replies,
      });
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
        dispatch(getRepliesForThread(res.data.thread._id));
      } else {
        dispatch({ type: actionTypes.GET_THREAD_FAILED });
      }
    });
  };
};

export const createThread = (forum, userId, title, content, tags) => {
  return (dispatch) => {
    const thread = {
      forum: forum._id,
      user: userId,
      title,
      content,
      tags,
    };
    return axios.post(`/threads`, thread).then((res) => {
      dispatch(setCurrentThread(res.data.thread));
      history.push({
        pathname: `/${forum.slug}/thread/${res.data.thread.slug}`,
      });
    });
  };
};

export const createReply = (user, thread, content) => {
  return (dispatch) => {
    const reply = {
      user,
      thread,
      content,
    };

    return axios.post(`/replies`, reply).then((res) => {
      console.log(res.data.reply);
      dispatch({
        type: actionTypes.CREATE_REPLY,
        reply: res.data.reply,
      });
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

export const deleteThread = (threadId) => {
  return (dispatch) => {
    dispatch({ type: actionTypes.DELETE_THREAD_START });
    return axios.delete(`/threads/${threadId}`).then((res) => {
      if (res.data.success) {
        dispatch({ type: actionTypes.DELETE_THREAD_SUCCESS });
      }
    });
  };
};

export const deleteThreadRedirect = () => {
  return {
    type: actionTypes.DELETE_THREAD_REDIRECT,
  };
};

export const clearUserThreads = () => {
  return {
    type: actionTypes.CLEAR_USER_THREADS,
  };
};

export const getUserThreads = (username) => {
  return (dispatch) => {
    return axios.get(`/users/${username}/threads`).then((res) => {
      dispatch({
        type: actionTypes.GET_USER_THREADS,
        userThreads: res.data.threads,
      });
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
