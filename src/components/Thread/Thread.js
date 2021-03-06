import React from 'react';
import './Thread.scss';
import ReplyEditor from './ReplyEditor/ReplyEditor';
import InitialPost from './InitialPost/InitialPost';
import Replies from './Replies/Replies';
import { ClipLoader } from 'react-spinners';
import PropTypes from 'prop-types';

/* Component for single thread, editor for new reply, and all replies for thread */
const Thread = (props) => {
  let threadContent = null;
  if (props.gettingThread || props.deletingThread) {
    threadContent = (
      <div className='thread__loading'>
        <ClipLoader size={50} />
      </div>
    );
  } else if (props.getThreadError) {
    threadContent = (
      <div className='thread__not-found'>{props.getThreadError}</div>
    );
  } else {
    let error = null;
    if (
      props.toggleFavoriteError ||
      props.togglePinError ||
      props.deleteThreadError
    ) {
      error = (
        <div className='thread__error'>
          {props.toggleFavoriteError ||
            props.togglePinError ||
            props.deleteThreadError}
        </div>
      );
    }
    threadContent = (
      <React.Fragment>
        <InitialPost
          thread={props.thread}
          user={props.user}
          togglingFavorite={props.togglingFavorite}
          togglingPin={props.togglingPin}
          handleFavoriteThread={props.handleFavoriteThread}
          handleUnfavoriteThread={props.handleUnfavoriteThread}
          handleDeleteThread={props.handleDeleteThread}
          handleSetPinnedStatus={props.handleSetPinnedStatus}
          deletingThread={props.deletingThread}
        />
        {error}
        <ReplyEditor
          noReplyError={props.noReplyError}
          creatingReply={props.creatingReply}
          user={props.user}
          loadingUser={props.loadingUser}
          createReplyError={props.createReplyError}
          replyContent={props.replyContent}
          handleSaveReplyContent={props.handleSaveReplyContent}
        />
        <Replies
          user={props.user}
          replies={props.replies}
          gettingReplies={props.gettingReplies}
          deletingReplyId={props.deletingReplyId}
          deleteReplyError={props.deleteReplyError}
          handleDeleteReply={props.handleDeleteReply}
        />
      </React.Fragment>
    );
  }

  return <div className='thread'>{threadContent}</div>;
};

Thread.propTypes = {
  thread: PropTypes.object,
  user: PropTypes.object,
  togglingFavorite: PropTypes.bool.isRequired,
  togglingPin: PropTypes.bool.isRequired,
  handleFavoriteThread: PropTypes.func.isRequired,
  handleUnfavoriteThread: PropTypes.func.isRequired,
  handleDeleteThread: PropTypes.func.isRequired,
  handleSetPinnedStatus: PropTypes.func.isRequired,
  gettingThread: PropTypes.bool.isRequired,
  getThreadError: PropTypes.string,
  deletingThread: PropTypes.bool.isRequired,
  deleteThreadError: PropTypes.string,
  noReplyError: PropTypes.bool,
  creatingReply: PropTypes.bool.isRequired,
  createReplyError: PropTypes.string,
  replyContent: PropTypes.string,
  handleSaveReplyContent: PropTypes.func.isRequired,
  replies: PropTypes.arrayOf(PropTypes.object),
  gettingReplies: PropTypes.bool.isRequired,
  deletingReplyId: PropTypes.string,
  deleteReplyError: PropTypes.string,
  handleDeleteReply: PropTypes.func.isRequired,
};

export default Thread;
