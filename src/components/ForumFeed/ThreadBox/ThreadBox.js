import React from 'react';
import './ThreadBox.scss';
import Tag from '../../Tag/Tag';
import { FaUser } from 'react-icons/fa';
import Moment from 'moment';
import { Link } from 'react-router-dom';

const ThreadBox = (props) => {
  const { thread, setCurrentThread } = props;

  console.log(thread);

  let tags = null;
  tags = thread.tags.map((tag) => {
    return <Tag key={tag}>{tag}</Tag>;
  });

  const onClickLink = () => {
    setCurrentThread(thread);
  };

  let userInfo = null;
  if (thread.user.username) {
    userInfo = (
      <Link
        to={`/user/${thread.user.username}`}
        className='thread-box__userinfo link'
      >
        <FaUser className='thread-box__usericon' />
        <div className='thread-box__username'>{thread.user.username}</div>
      </Link>
    );
  }

  return (
    <div className='thread-box'>
      <Link
        onClick={onClickLink}
        to={{ pathname: `/${thread.forum.slug}/thread/${thread.slug}` }}
        className='thread-box__title'
      >
        {thread.title}
      </Link>
      {userInfo}
      <div className='thread-box__metadata'>
        <div className='thread-box__tags'>{tags}</div>
        <div className='thread-box__stats'>
          <div className='thread-box__age'>
            {Moment(thread.createdAt).fromNow()}
          </div>
          <div className='thread-box__favorites'>
            {thread.favorites.length} favorites
          </div>
          <div className='thread-box__replies'>
            {thread.replies.length} replies
          </div>
        </div>
      </div>
    </div>
  );
};

export default React.memo(ThreadBox);
