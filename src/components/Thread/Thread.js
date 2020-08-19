import React from 'react';
import './Thread.scss';
import ReplyEditor from './ReplyEditor/ReplyEditor';
import InitialPost from './InitialPost/InitialPost';
import Replies from './Replies/Replies';
import { ClipLoader } from 'react-spinners';

const Thread = (props) => {
  let threadContent = null;
  if (props.gettingThread || props.deletingThread) {
    threadContent = (
      <div className='thread__loading'>
        <ClipLoader size={50} />
      </div>
    );
  } else if (!props.thread && props.doneGettingThread) {
    threadContent = <div className='thread__not-found'>Thread not found.</div>;
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

export default React.memo(Thread);
