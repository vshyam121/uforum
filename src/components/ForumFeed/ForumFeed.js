import React from 'react';
import './ForumFeed.scss';
import FeedBox from './FeedBox/FeedBox';
import Button from '../Theme/Button/Button';
import { Link } from 'react-router-dom';
import { ClipLoader } from 'react-spinners';

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
  if (gettingForums || !forums) {
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

export default ForumFeed;
