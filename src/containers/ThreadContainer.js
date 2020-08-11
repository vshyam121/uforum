import React, { useEffect } from 'react';
import { useParams } from 'react-router';
import Thread from '../components/Thread/Thread';
import { connect } from 'react-redux';
import {
  getRepliesForThread,
  getThread,
  createReply,
  favoriteThread,
  unfavoriteThread,
  deleteThread,
  deleteThreadRedirect,
} from '../store/forum/actions';

const ThreadContainer = (props) => {
  const { threadSlug } = useParams();
  const {
    getThread,
    getRepliesForThread,
    replies,
    currentThread,
    gettingThread,
    createReply,
    user,
    loadingUser,
    favoriteThread,
    unfavoriteThread,
    deleteThread,
    deleteThreadRedirect,
    deletingThread,
    deletedThread,
  } = props;

  useEffect(() => {
    if (!currentThread) {
      getThread(threadSlug);
    } else {
      getRepliesForThread(currentThread._id);
    }
  }, [getThread, getRepliesForThread, currentThread, threadSlug]);

  const saveReplyContent = (content) => {
    createReply(user._id, currentThread._id, content);
  };

  const handleUnfavoriteThread = () => {
    console.log('unfavorite');
    unfavoriteThread(user._id, currentThread._id);
  };

  const handleFavoriteThread = () => {
    console.log('favorite');
    favoriteThread(user._id, currentThread._id);
  };

  const handleDeleteThread = () => {
    deleteThread(currentThread._id);
  };

  const handleDeleteThreadRedirect = () => {
    deleteThreadRedirect();
  };

  return (
    <Thread
      threadSlug={threadSlug}
      thread={currentThread}
      gettingThread={gettingThread}
      replies={replies}
      saveReplyContent={saveReplyContent}
      user={user}
      loadingUser={loadingUser}
      handleFavoriteThread={handleFavoriteThread}
      handleUnfavoriteThread={handleUnfavoriteThread}
      handleDeleteThread={handleDeleteThread}
      handleDeleteThreadRedirect={handleDeleteThreadRedirect}
      deletingThread={deletingThread}
      deletedThread={deletedThread}
    />
  );
};

const mapStateToProps = (state) => ({
  replies: state.forum.replies,
  currentThread: state.forum.currentThread,
  gettingThread: state.forum.gettingThread,
  deletingThread: state.forum.deletingThread,
  deletedThread: state.forum.deletedThread,
  user: state.auth.user,
  loadingUser: state.auth.loadingUser,
});

export default connect(mapStateToProps, {
  getRepliesForThread,
  getThread,
  createReply,
  favoriteThread,
  unfavoriteThread,
  deleteThread,
  deleteThreadRedirect,
})(React.memo(ThreadContainer));
