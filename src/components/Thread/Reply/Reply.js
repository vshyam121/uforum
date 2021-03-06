import React from 'react';
import './Reply.scss';
import { FaUser } from 'react-icons/fa';
import Moment from 'moment';
import RichTextEditor from '../../RichTextEditor/RichTextEditor';
import { FaTrashAlt } from 'react-icons/fa';
import { ClipLoader } from 'react-spinners';
import PropTypes from 'prop-types';

const Reply = (props) => {
  const {
    user,
    reply,
    handleDeleteReply,
    deletingReplyId,
    deleteReplyError,
  } = props;

  let deleteReply = null;
  if (user && (user._id === reply.user._id || user.role === 'admin')) {
    deleteReply = (
      <div
        className='reply__delete'
        onClick={() => handleDeleteReply(reply._id)}
      >
        <FaTrashAlt className='post__action-icon' />
        <span>Delete</span>
      </div>
    );
  }

  let replyContent = null;
  if (deletingReplyId === reply._id && !deleteReplyError) {
    replyContent = (
      <div className='reply__loading'>
        <ClipLoader size={50} />
      </div>
    );
  } else {
    replyContent = <RichTextEditor readOnly content={reply.content} />;
  }

  return (
    <div className='reply'>
      <div className='reply__top'>
        <div className='reply__userinfo'>
          <FaUser className='reply__usericon' />
          <div className='reply__username'>{reply.user.username}</div>
        </div>
        <div className='reply__top-right'>
          <div className='reply__age'> {Moment(reply.createdAt).fromNow()}</div>
          {deleteReply}
        </div>
      </div>
      <div className='reply__content'>{replyContent} </div>
    </div>
  );
};

Reply.propTypes = {
  user: PropTypes.object,
  reply: PropTypes.object,
  handleDeleteReply: PropTypes.func.isRequired,
  deletingReplyId: PropTypes.string,
  deleteReplyError: PropTypes.string,
};

export default Reply;
