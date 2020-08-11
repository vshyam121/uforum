import React from 'react';
import './ForumFeed.scss';
import FeedBox from './FeedBox/FeedBox';
import Button from '../Theme/Button/Button';
import { Link } from 'react-router-dom';
import { ClipLoader } from 'react-spinners';

const ForumFeed = (props) => {
  const { forums, setCurrentThread } = props;
  let { forumSlug } = props;

  let forumFeedContent = null;
  if (!forums) {
    forumFeedContent = (
      <div className='forum-feed__loading'>
        <ClipLoader size={50} />
      </div>
    );
  } else {
    forumFeedContent = (
      <React.Fragment>
        <FeedBox
          title='Pinned'
          threads={props.pinnedThreads}
          setCurrentThread={setCurrentThread}
        />
        <FeedBox
          title='Threads'
          threads={props.threads}
          setCurrentThread={setCurrentThread}
        />
      </React.Fragment>
    );
  }

  return (
    <div className='forum-feed'>
      <div className='forum-feed__boxes'>{forumFeedContent}</div>
      <div className='forum-feed__new-thread'>
        <Link to={`/${forumSlug}/new-thread`}>
          <Button>New Thread</Button>
        </Link>
      </div>
    </div>
  );
};

export default ForumFeed;
