import React from 'react';
import './FeedBox.scss';
import ThreadBox from '../ThreadBox/ThreadBox';
import { ClipLoader } from 'react-spinners';
import PropTypes from 'prop-types';

/* Box containing a list of threads that form a feed */
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
    hideUser,
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
          hideUser={hideUser}
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

FeedBox.propTypes = {
  title: PropTypes.string.isRequired,
  threads: PropTypes.arrayOf(PropTypes.object),
  gettingThreads: PropTypes.bool.isRequired,
  error: PropTypes.string,
  setCurrentThread: PropTypes.func.isRequired,
  handleGetThreads: PropTypes.func,
  sortingMethod: PropTypes.string,
  setSortingMethod: PropTypes.func,
  sort: PropTypes.bool,
  hideUser: PropTypes.bool,
};

export default FeedBox;
