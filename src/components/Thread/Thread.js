import React from 'react';
import './Thread.scss';
import RichEditor from '../RichEditor/RichEditor';
import InitialPost from './InitialPost/InitialPost';
import Reply from './Reply/Reply';
import { REPLY } from '../RichEditor/RichEditor';
import { ClipLoader } from 'react-spinners';

const Thread = (props) => {
  const {
    thread,
    gettingThread,
    replies,
    creatingReply,
    gettingReplies,
    saveReplyContent,
    user,
    loadingUser,
    handleFavoriteThread,
    handleUnfavoriteThread,
    handleDeleteThread,
    deletingThread,
  } = props;

  let repliesContent = null;
  if (gettingReplies) {
    repliesContent = (
      <div className='thread__loading'>
        <ClipLoader size={50} />
      </div>
    );
  } else if (replies) {
    repliesContent = (
      <div className='thread__replies'>
        {replies.map((reply) => (
          <Reply key={reply._id} reply={reply} />
        ))}
      </div>
    );
  }

  console.log(loadingUser);

  let editor = null;
  if (loadingUser || creatingReply) {
    editor = (
      <div className='thread__loading'>
        <ClipLoader size={50} />
      </div>
    );
  } else {
    if (!user) {
      editor = <div className='thread__signin'>Please sign in to reply.</div>;
    } else {
      editor = (
        <div className='thread__editor'>
          <RichEditor type={REPLY} saveContent={saveReplyContent} />
        </div>
      );
    }
  }

  let threadContent = null;
  if (gettingThread || deletingThread) {
    threadContent = (
      <div className='thread__loading'>
        <ClipLoader size={50} />
      </div>
    );
  } else if (!thread) {
    threadContent = <div className='thread__not-found'>Thread not found</div>;
  } else {
    threadContent = (
      <React.Fragment>
        <InitialPost
          thread={thread}
          user={user}
          handleFavoriteThread={handleFavoriteThread}
          handleUnfavoriteThread={handleUnfavoriteThread}
          handleDeleteThread={handleDeleteThread}
          deletingThread={deletingThread}
        />
        {editor}
        {repliesContent}
      </React.Fragment>
    );
  }

  return <div className='thread'>{threadContent}</div>;
};

export default React.memo(Thread);
