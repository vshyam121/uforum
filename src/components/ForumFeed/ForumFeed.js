import React from 'react';
import './ForumFeed.scss';
import FeedBox from './FeedBox/FeedBox';
import Button from '../Button/Button';

const ForumFeed = (props) => {
  return (
    <div className='forum-feed'>
      <div className='forum-feed__boxes'>
        <FeedBox />
        <FeedBox />
      </div>
      <div className='forum-feed__new-thread'>
        <Button>New Thread</Button>
      </div>
    </div>
  );
};

export default ForumFeed;
