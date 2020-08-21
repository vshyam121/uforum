import React, { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router';
import Thread from '../components/Thread/Thread';
import { connect } from 'react-redux';
import {
  createReply,
  deleteReply,
  deleteThread,
  getReplies,
  getThread,
  favoriteThread,
  unfavoriteThread,
  setThreadPinnedStatus,
  resetThreadErrors,
} from '../store/thread/actions';
import find from 'lodash/find';

/* Container for thread, with initial post, new reply editor and list of replies */
const ThreadContainer = (props) => {
  const { forumSlug, threadSlug } = useParams();
  const {
    forums,
    getThread,
    getReplies,
    thread,
    createReply,
    user,
    favoriteThread,
    unfavoriteThread,
    deleteThread,
    deletingReply,
    deleteReply,
    setThreadPinnedStatus,
    resetThreadErrors,
  } = props;

  const usePrevious = (value) => {
    const ref = useRef();
    useEffect(() => {
      ref.current = value;
    });
    return ref.current;
  };

  const previousThread = usePrevious(thread);

  useEffect(() => {
    if (!thread) {
      getThread(threadSlug);
    } else if (!previousThread || thread._id !== previousThread._id) {
      getReplies(thread._id);
    }
    return () => {
      resetThreadErrors();
    };
  }, [
    getThread,
    getReplies,
    thread,
    previousThread,
    threadSlug,
    deletingReply,
    resetThreadErrors,
  ]);

  const [noReplyError, setNoReplyError] = useState(null);
  const handleSaveReplyContent = (content, contentHasChanged) => {
    if (!contentHasChanged) {
      setNoReplyError(true);
    } else {
      setNoReplyError(false);
      const forum = find(forums, { slug: forumSlug });
      createReply(forum._id, user._id, thread._id, content);
    }
  };

  const handleUnfavoriteThread = () => {
    unfavoriteThread(user._id, thread._id);
  };

  const handleFavoriteThread = () => {
    favoriteThread(user._id, thread._id);
  };

  const handleSetPinnedStatus = (pinnedStatus) => {
    setThreadPinnedStatus(thread._id, pinnedStatus);
  };

  const handleDeleteThread = () => {
    deleteThread(forumSlug, thread._id);
  };

  const handleDeleteReply = (replyId) => {
    deleteReply(thread._id, replyId);
  };

  return (
    <Thread
      {...props}
      forumSlug={forumSlug}
      noReplyError={noReplyError}
      handleSaveReplyContent={handleSaveReplyContent}
      handleFavoriteThread={handleFavoriteThread}
      handleUnfavoriteThread={handleUnfavoriteThread}
      handleDeleteThread={handleDeleteThread}
      handleDeleteReply={handleDeleteReply}
      handleSetPinnedStatus={handleSetPinnedStatus}
    />
  );
};

const mapStateToProps = (state) => ({
  forums: state.feeds.forums,
  replies: state.thread.replies,
  gettingReplies: state.thread.gettingReplies,
  creatingReply: state.thread.creatingReply,
  createReplyError: state.thread.createReplyError,
  thread: state.thread.currentThread,
  gettingThread: state.thread.gettingThread,
  doneGettingThread: state.thread.doneGettingThread,
  deletingThread: state.thread.deletingThread,
  deleteThreadError: state.thread.deleteThreadError,
  deletingReplyId: state.thread.deletingReplyId,
  deleteReplyError: state.thread.deleteReplyError,
  togglingFavorite: state.thread.togglingFavorite,
  toggleFavoriteError: state.thread.toggleFavoriteError,
  togglingPin: state.thread.togglingPin,
  togglePinError: state.thread.togglePinError,
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
  deleteReply,
  setThreadPinnedStatus,
  resetThreadErrors,
})(React.memo(ThreadContainer));
