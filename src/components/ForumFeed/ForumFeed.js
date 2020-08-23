import React from 'react';
import './ForumFeed.scss';
import FeedBox from './FeedBox/FeedBox';
import Button from '../Theme/Button/Button';
import { Link } from 'react-router-dom';
import { ClipLoader } from 'react-spinners';
import PropTypes from 'prop-types';

/* All feeds for a particular forum */
const ForumFeed = (props) => {
  const {
    forums,
    forumFound,
    gettingForums,
    getForumsError,
    forumSlug,
    unpinnedThreads,
    gettingUnpinnedThreads,
    getUnpinnedThreadsError,
    pinnedThreads,
    gettingPinnedThreads,
    getPinnedThreadsError,
    setCurrentThread,
    handleGetThreads,
    sortingMethod,
    setSortingMethod,
  } = props;

  let forumFeedBoxContent = null;
  if (gettingForums) {
    forumFeedBoxContent = (
      <div className='forum-feed__loading'>
        <ClipLoader size={50} />
      </div>
    );
  } else if (getForumsError) {
    forumFeedBoxContent = (
      <div className='forum-feed__error'>{getForumsError}</div>
    );
  } else {
    forumFeedBoxContent = (
      <React.Fragment>
        <FeedBox
          title='Pinned'
          threads={pinnedThreads}
          gettingThreads={gettingPinnedThreads}
          setCurrentThread={setCurrentThread}
          error={getPinnedThreadsError}
        />
        <FeedBox
          title='Threads'
          threads={unpinnedThreads}
          gettingThreads={gettingUnpinnedThreads}
          error={getUnpinnedThreadsError}
          setCurrentThread={setCurrentThread}
          handleGetThreads={handleGetThreads}
          sortingMethod={sortingMethod}
          setSortingMethod={setSortingMethod}
          sort
        />
      </React.Fragment>
    );
  }

  let forumFeedContent = null;
  if (!forumFound && forums) {
    forumFeedContent = (
      <div className='forum-feed__not-found'>Forum not found.</div>
    );
  } else {
    forumFeedContent = (
      <React.Fragment>
        <div className='forum-feed__boxes'>{forumFeedBoxContent}</div>
        <div className='forum-feed__new-thread'>
          <Link to={`/${forumSlug}/new-thread`}>
            <Button>New Thread</Button>
          </Link>
        </div>
      </React.Fragment>
    );
  }

  return <div className='forum-feed'>{forumFeedContent}</div>;
};

ForumFeed.propTypes = {
  forums: PropTypes.arrayOf(PropTypes.object),
  forumFound: PropTypes.bool.isRequired,
  gettingForums: PropTypes.bool.isRequired,
  getForumsError: PropTypes.string,
  forumSlug: PropTypes.string,
  unpinnedThreads: PropTypes.arrayOf(PropTypes.object),
  gettingUnpinnedThreads: PropTypes.bool.isRequired,
  getUnpinnedThreadsError: PropTypes.string,
  pinnedThreads: PropTypes.arrayOf(PropTypes.object),
  gettingPinnedThreads: PropTypes.bool.isRequired,
  getPinnedThreadsError: PropTypes.string,
  setCurrentThread: PropTypes.func.isRequired,
  handleGetThreads: PropTypes.func.isRequired,
  sortingMethod: PropTypes.string.isRequired,
  setSortingMethod: PropTypes.func.isRequired,
};

export default ForumFeed;
