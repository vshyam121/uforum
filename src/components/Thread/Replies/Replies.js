import React from 'react';
import { ClipLoader } from 'react-spinners';
import Reply from '../Reply/Reply';
import PropTypes from 'prop-types';

const Replies = (props) => {
  const {
    gettingReplies,
    replies,
    deleteReplyError,
    deletingReplyId,
    user,
    handleDeleteReply,
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
        {replies.map((reply) => {
          let replyError = null;
          if (deleteReplyError && deletingReplyId === reply._id) {
            replyError = (
              <div className='thread__error'>{deleteReplyError}</div>
            );
          }
          return (
            <React.Fragment key={reply._id}>
              {replyError}
              <Reply
                reply={reply}
                user={user}
                handleDeleteReply={handleDeleteReply}
                deletingReplyId={deletingReplyId}
                deleteReplyError={deleteReplyError}
              />
            </React.Fragment>
          );
        })}
      </div>
    );
  }

  return repliesContent;
};

Replies.propTypes = {
  gettingReplies: PropTypes.bool.isRequired,
  replies: PropTypes.array,
  deleteReplyError: PropTypes.string,
  deletingReplyId: PropTypes.string,
  user: PropTypes.object,
  handleDeleteReply: PropTypes.func.isRequired,
};

export default Replies;
