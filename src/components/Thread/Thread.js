import React from 'react';
import './Thread.scss';
import RichEditor from '../../containers/RichEditor';
import Post from './Post/Post';
import Reply from './Reply/Reply';

const Thread = (props) => {
  const testArr = [1, 2];
  return (
    <div className='thread'>
      <Post />
      <div className='thread__editor'>
        <RichEditor />
      </div>
      <div className='thread__replies'>
        {testArr.map((element) => (
          <Reply />
        ))}
      </div>
    </div>
  );
};

export default Thread;
