import React from 'react';
import './FeedBox.scss';
import ThreadBox from '../ThreadBox/ThreadBox';
import { ClipLoader } from 'react-spinners';

const FeedBox = (props) => {
  const { threads, gettingThreads, setCurrentThread } = props;
  console.log(threads);

  let threadBoxes = null;
  if (gettingThreads) {
    threadBoxes = (
      <div className='feed-box__loading'>
        <ClipLoader size={50} />
      </div>
    );
  } else if (threads && threads.length > 0) {
    threadBoxes = threads.map((thread) => {
      return (
        <ThreadBox
          key={thread._id}
          thread={thread}
          setCurrentThread={setCurrentThread}
        />
      );
    });
  } else {
    threadBoxes = <div className='feed-box__none'>No threads...</div>;
  }

  let feedBox = null;
  feedBox = (
    <div className='feed-box'>
      <div className='feed-box__title'>
        <h2>{props.title}</h2>
      </div>
      {threadBoxes}
    </div>
  );

  return feedBox;
};

export default React.memo(FeedBox);
