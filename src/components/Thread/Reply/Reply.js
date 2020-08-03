import React from 'react';
import './Reply.scss';
import { FaUser } from 'react-icons/fa';

const Reply = (props) => {
  return (
    <div className='reply'>
      <div className='reply__top'>
        <div className='reply__userinfo'>
          <FaUser className='reply__usericon' />
          <div className='reply__username'>vshyam121</div>
        </div>

        <div className='reply__age'>9 years ago</div>
      </div>
      <div className='reply__content'>Content</div>
    </div>
  );
};

export default Reply;
