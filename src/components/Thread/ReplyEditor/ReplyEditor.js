import React from 'react';
import RichTextEditor from '../../RichTextEditor/RichTextEditor';
import { ClipLoader } from 'react-spinners';
import { REPLY } from '../../RichTextEditor/RichTextEditor';
import PropTypes from 'prop-types';

const ReplyEditor = (props) => {
  const {
    loadingUser,
    creatingReply,
    noReplyError,
    user,
    createReplyError,
    replyContent,
    handleSaveReplyContent,
  } = props;

  let editor = null;
  if (loadingUser || creatingReply) {
    editor = (
      <div className='thread__loading'>
        <ClipLoader size={50} />
      </div>
    );
  } else if (!user) {
    editor = <div className='thread__signin'>Please sign in to reply.</div>;
  } else {
    let error = null;
    if (noReplyError) {
      error = 'Please provide some content in your reply.';
    } else if (createReplyError) {
      error = createReplyError;
    }
    editor = (
      <div className='thread__editor'>
        <div className='thread__error'>{error}</div>
        <RichTextEditor
          type={REPLY}
          content={replyContent}
          saveContent={handleSaveReplyContent}
        />
      </div>
    );
  }

  return editor;
};

ReplyEditor.propTypes = {
  loadingUser: PropTypes.bool.isRequired,
  creatingReply: PropTypes.bool.isRequired,
  noReplyError: PropTypes.string,
  user: PropTypes.object,
  createReplyError: PropTypes.string,
  replyContent: PropTypes.string,
  handleSaveReplyContent: PropTypes.func.isRequired,
};

export default ReplyEditor;
