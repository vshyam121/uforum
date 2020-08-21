import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { createThread, resetCreateThreadError } from '../store/thread/actions';
import find from 'lodash/find';
import { useParams } from 'react-router-dom';
import NewThread from '../components/NewThread/NewThread';
import PropTypes from 'prop-types';

export const TITLE_TOO_SHORT = 'TITLE_TOO_SHORT';
export const NO_CONTENT = 'NO_CONTENT';
export const NO_TAGS = 'NO_TAGS';
export const EMPTY_TAG = 'EMPTY_TAG';
export const DUPLICATE_TAG = 'DUPLICATE_TAG';
export const INCORRECT_FORMAT_TAG = 'INCORRECT_FORMAT_TAG';

/* Container for creating a new thread */
const NewThreadContainer = (props) => {
  const [tags, setTags] = useState([]);

  const [error, setError] = useState(null);

  const { forumSlug } = useParams();

  const [title, setTitle] = useState('');

  const handleSetTitle = (e) => {
    setTitle(e.target.value);
  };

  const submitTag = (tag) => {
    setTags((prevTags) => [...prevTags, tag]);
  };

  const deleteTag = (index) => {
    setTags((prevTags) => {
      const newTags = [...prevTags];
      newTags.splice(index, 1);
      return newTags;
    });
  };

  const handleSavePostContent = (content, contentHasChanged) => {
    if (title.length < 15) {
      setError(TITLE_TOO_SHORT);
      return;
    } else if (tags.length === 0) {
      setError(NO_TAGS);
      return;
    } else if (!contentHasChanged) {
      setError(NO_CONTENT);
      return;
    }

    setError(null);
    const forum = find(props.forums, { slug: forumSlug });
    props.createThread(forum, props.user._id, title, content, tags);
  };

  useEffect(() => {
    return () => {
      if (props.createThreadError) {
        props.resetCreateThreadError();
      }
    };
  });
  return (
    <NewThread
      {...props}
      error={error}
      setError={setError}
      tags={tags}
      title={title}
      handleSetTitle={handleSetTitle}
      handleSavePostContent={handleSavePostContent}
      deleteTag={deleteTag}
      submitTag={submitTag}
    />
  );
};

NewThreadContainer.propTypes = {
  forums: PropTypes.array,
  user: PropTypes.object,
  loadingUser: PropTypes.bool.isRequired,
  creatingThread: PropTypes.bool.isRequired,
  createThreadError: PropTypes.string,
};

const mapStateToProps = (state) => ({
  forums: state.feeds.forums,
  user: state.auth.user,
  loadingUser: state.auth.loadingUser,
  creatingThread: state.thread.creatingThread,
  createThreadError: state.thread.createThreadError,
});

export default connect(mapStateToProps, {
  createThread,
  resetCreateThreadError,
})(NewThreadContainer);
