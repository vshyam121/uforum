import React, { useEffect, useRef } from 'react';
import { useParams } from 'react-router';
import Thread from '../components/Thread/Thread';
import { connect } from 'react-redux';
import {
  getReplies,
  getThread,
  createReply,
  favoriteThread,
  unfavoriteThread,
  deleteThread,
} from '../store/forum/actions';

const ThreadContainer = (props) => {
  const { forumSlug, threadSlug } = useParams();
  const {
    getThread,
    getReplies,
    gettingReplies,
    replies,
    currentThread,
    gettingThread,
    creatingReply,
    createReply,
    user,
    loadingUser,
    favoriteThread,
    unfavoriteThread,
    deleteThread,
    deletingThread,
  } = props;

  const usePrevious = (value) => {
    const ref = useRef();
    useEffect(() => {
      ref.current = value;
    });
    return ref.current;
  };

  const previousThread = usePrevious(currentThread);

  useEffect(() => {
    if (!currentThread) {
      getThread(threadSlug);
    } else if (!previousThread || currentThread._id !== previousThread._id) {
      getReplies(currentThread._id);
    }
  }, [getThread, getReplies, currentThread, previousThread, threadSlug]);

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
    deleteThread(forumSlug, currentThread._id);
  };

  return (
    <Thread
      forumSlug={forumSlug}
      thread={currentThread}
      gettingThread={gettingThread}
      replies={replies}
      gettingReplies={gettingReplies}
      creatingReply={creatingReply}
      saveReplyContent={saveReplyContent}
      user={user}
      loadingUser={loadingUser}
      handleFavoriteThread={handleFavoriteThread}
      handleUnfavoriteThread={handleUnfavoriteThread}
      handleDeleteThread={handleDeleteThread}
      deletingThread={deletingThread}
    />
  );
};

const mapStateToProps = (state) => ({
  replies: state.forum.replies,
  gettingReplies: state.forum.gettingReplies,
  creatingReply: state.forum.creatingReply,
  currentThread: state.forum.currentThread,
  gettingThread: state.forum.gettingThread,
  deletingThread: state.forum.deletingThread,
  user: state.auth.user,
  loadingUser: state.auth.loadingUser,
});

export default connect(mapStateToProps, {
  getReplies,
  getThread,
  createReply,
  favoriteThread,
  unfavoriteThread,
  deleteThread,
})(React.memo(ThreadContainer));
