import React from 'react';
import './ThreadBox.scss';
import Tag from '../../Tag/Tag';
import { FaUser } from 'react-icons/fa';

const ThreadBox = (props) => {
  return (
    <div className='thread-box'>
      <div className='thread-box__title'>Title</div>
      <div className='thread-box__userinfo'>
        <FaUser className='thread-box__usericon' />
        <div className='thread-box__username'>vshyam121</div>
      </div>
      <div className='thread-box__metadata'>
        <div className='thread-box__tags'>
          <Tag>Nine</Tag>
        </div>
        <div className='thread-box__stats'>
          <div className='thread-box__age'>9 years ago</div>
          <div className='thread-box__favorites'>9 favorites</div>
          <div className='thread-box__replies'>9 replies</div>
        </div>
      </div>
    </div>
  );
};

export default ThreadBox;
