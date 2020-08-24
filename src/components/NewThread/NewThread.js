import React from 'react';
import './NewThread.scss';
import AddTags from './AddTags/AddTags';
import RichTextEditor, { THREAD } from '../RichTextEditor/RichTextEditor';
import { ClipLoader } from 'react-spinners';
import {
  TITLE_TOO_SHORT,
  NO_CONTENT,
  DUPLICATE_TAG,
  NO_TAGS,
  EMPTY_TAG,
  INCORRECT_FORMAT_TAG,
} from '../../containers/NewThreadContainer';
import PropTypes from 'prop-types';

/* Component to create new thread */
const NewThread = (props) => {
  const {
    user,
    loadingUser,
    creatingThread,
    title,
    handleSetTitle,
    error,
    createThreadError,
    setError,
    handleSavePostContent,
    tags,
    submitTag,
    deleteTag,
  } = props;

  let tagsError = null;
  switch (error) {
    case NO_TAGS:
      tagsError = 'Please provide some tags.';
      break;
    case EMPTY_TAG:
      tagsError = 'Cannot add an empty tag.';
      break;
    case DUPLICATE_TAG:
      tagsError = 'Tag already added.';
      break;
    case INCORRECT_FORMAT_TAG:
      tagsError =
        'Tag can only contain letters and numbers. Spaces and special characters are not allowed. Min 4 chars and max 20 characters.';
      break;
    default:
  }

  let newThread = null;
  if (loadingUser || creatingThread) {
    newThread = (
      <div className='new-thread__loading'>
        <ClipLoader size={50} />
      </div>
    );
  } else if (!user) {
    newThread = (
      <div className='new-thread__signin'>
        Please sign in to start a new thread.
      </div>
    );
  } else {
    newThread = (
      <React.Fragment>
        <div className='new-thread__top'>
          <input
            className='new-thread__title'
            type='text'
            placeholder='Thread Title...'
            value={title}
            onChange={handleSetTitle}
          />
          <div className='new-thread__error'>
            {error === TITLE_TOO_SHORT
              ? 'Title has to be at least 4 chars long'
              : null}
          </div>
          <div className='new-thread__tags'>
            <AddTags
              setError={setError}
              tags={tags}
              submitTag={submitTag}
              deleteTag={deleteTag}
            />
            <div className='new-thread__error'>{tagsError}</div>
          </div>
        </div>
        <div className='new-thread__editor'>
          <div className='new-thread__error'>
            {error === NO_CONTENT
              ? 'Please provide some content.'
              : createThreadError
              ? createThreadError
              : null}
          </div>
          <RichTextEditor type={THREAD} saveContent={handleSavePostContent} />
        </div>
      </React.Fragment>
    );
  }

  return <div className='new-thread'>{newThread}</div>;
};

NewThread.propTypes = {
  user: PropTypes.object,
  loadingUser: PropTypes.bool.isRequired,
  creatingThread: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired,
  handleSetTitle: PropTypes.func.isRequired,
  error: PropTypes.string,
  createThreadError: PropTypes.string,
  setError: PropTypes.func.isRequired,
  handleSavePostContent: PropTypes.func.isRequired,
  tags: PropTypes.array.isRequired,
  submitTag: PropTypes.func.isRequired,
  deleteTag: PropTypes.func.isRequired,
};

export default NewThread;
