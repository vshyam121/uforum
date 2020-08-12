import React, { useState, useRef } from 'react';
import './NewThread.scss';
import AddTags from './AddTags/AddTags';
import RichEditor, { THREAD } from '../../components/RichEditor/RichEditor';
import { connect } from 'react-redux';
import { createThread } from '../../store/forum/actions';
import find from 'lodash/find';
import { useParams } from 'react-router-dom';
import { ClipLoader } from 'react-spinners';

const TITLE_TOO_SHORT = 'TITLE__TOO_SHORT';
const NO_CONTENT = 'NO_CONTENT';
const NO_TAGS = 'NO_TAGS';
export const EMPTY_TAG = 'EMPTY_TAG';
export const DUPLICATE_TAG = 'DUPLICATE_TAG';
export const INCORRECT_FORMAT_TAG = 'INCORRECT_FORMAT_TAG';

const NewThread = (props) => {
  const [tags, setTags] = useState([]);

  const [error, setError] = useState(null);

  const { forumSlug } = useParams();

  const { forums, user, createThread, loadingUser, creatingThread } = props;

  const inputRef = useRef(null);

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

  const saveContent = (content, contentHasChanged) => {
    const title = inputRef.current.value;
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
    const forum = find(forums, { slug: forumSlug });
    createThread(forum, user._id, title, content, tags);
  };

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
  } else {
    if (!user) {
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
              ref={inputRef}
              className='new-thread__title'
              type='text'
              placeholder='Thread Title...'
            />
            <div className='new-thread__error'>
              {error === TITLE_TOO_SHORT
                ? 'Title has to be at least 15 chars long'
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
              {error === NO_CONTENT ? 'Please provide some content.' : null}
            </div>
            <RichEditor type={THREAD} saveContent={saveContent} />
          </div>
        </React.Fragment>
      );
    }
  }

  return <div className='new-thread'>{newThread}</div>;
};

const mapStateToProps = (state) => ({
  forums: state.forum.forums,
  user: state.auth.user,
  loadingUser: state.auth.loadingUser,
  creatingThread: state.forum.creatingThread,
});

export default connect(mapStateToProps, { createThread })(NewThread);
