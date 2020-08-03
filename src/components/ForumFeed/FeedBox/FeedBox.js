import React from 'react';
import './FeedBox.scss';
import ThreadBox from '../ThreadBox/ThreadBox';

const FeedBox = (props) => {
  const testArr = [1, 2];

  let threadBoxes = null;

  threadBoxes = testArr.map((element) => {
    return <ThreadBox />;
  });

  return (
    <div className='feed-box'>
      <div className='feed-box__title'>
        <h2>Title</h2>
      </div>
      <div className='feed-box__threads'>{threadBoxes}</div>
    </div>
  );
};

export default FeedBox;
