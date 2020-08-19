import React from 'react';
import './FeedBox.scss';
import ThreadBox from '../ThreadBox/ThreadBox';
import { ClipLoader } from 'react-spinners';

const FeedBox = (props) => {
  const {
    title,
    threads,
    gettingThreads,
    error,
    setCurrentThread,
    handleGetThreads,
    sortingMethod,
    setSortingMethod,
    sort,
  } = props;

  const handleSortingMethod = (sortingMethod) => {
    setSortingMethod(sortingMethod);
    handleGetThreads(sortingMethod);
  };

  let threadBoxes = null;
  if (gettingThreads) {
    threadBoxes = (
      <div className='feed-box__loading'>
        <ClipLoader size={50} />
      </div>
    );
  } else if (error) {
    threadBoxes = <div className='feed-box__error'>{error}</div>;
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

  let sortContent = null;
  if (sort) {
    let sortDateClassNames = ['feed-box__sort-type'];
    if (sortingMethod === 'date') {
      sortDateClassNames.push('feed-box__sort-type--selected');
    }
    let sortPopularityClassNames = ['feed-box__sort-type'];
    if (sortingMethod === 'popularity') {
      sortPopularityClassNames.push('feed-box__sort-type--selected');
    }
    sortContent = (
      <div className='feed-box__sort'>
        <div
          className={sortDateClassNames.join(' ')}
          onClick={() => handleSortingMethod('date')}
        >
          Latest
        </div>
        <div
          className={sortPopularityClassNames.join(' ')}
          onClick={() => handleSortingMethod('popularity')}
        >
          Popular
        </div>
      </div>
    );
  }

  let feedBox = null;
  feedBox = (
    <div className='feed-box'>
      <div className='feed-box__title'>
        <h2>{title}</h2>
        {sortContent}
      </div>
      {threadBoxes}
    </div>
  );

  return feedBox;
};

export default FeedBox;
