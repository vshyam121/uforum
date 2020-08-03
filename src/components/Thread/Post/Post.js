import React from 'react';
import './Post.scss';
import Tag from '../../Tag/Tag';
import { FaUser, FaHeart, FaRegHeart } from 'react-icons/fa';

const Post = (props) => {
  return (
    <div className='post'>
      <div className='post__top'>
        <div className='post__userinfo'>
          <FaUser className='post__usericon' />
          <div className='post__username'>vshyam121</div>
        </div>
        <div className='post__age'>9 days ago</div>
      </div>
      <div className='post__title'>Title</div>
      <div className='post__content'>Content</div>
      <div className='post__bottom'>
        <div className='post__tags'>
          <Tag>test</Tag>
        </div>
        <div className='post__favorite'>
          <FaRegHeart className='post__heart' />
          <span>Make favorite</span>
        </div>
      </div>
    </div>
  );
};

export default Post;
