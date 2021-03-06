import React from 'react';
import './ThreadBox.scss';
import Tag from '../../Tag/Tag';
import { FaUser } from 'react-icons/fa';
import Moment from 'moment';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

/* Single thread in feed with all thread info */
const ThreadBox = (props) => {
  const { hideUser, thread, setCurrentThread } = props;

  let tags = null;
  tags = thread.tags.map((tag) => {
    return <Tag key={tag}>{tag}</Tag>;
  });

  let userInfo = null;
  if (thread.user.username && !hideUser) {
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
        onClick={() => setCurrentThread(thread)}
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

ThreadBox.propTypes = {
  hideUser: PropTypes.bool,
  thread: PropTypes.shape({
    user: PropTypes.object.isRequired,
    forum: PropTypes.object.isRequired,
    slug: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    favorites: PropTypes.arrayOf(PropTypes.string).isRequired,
    replies: PropTypes.arrayOf(PropTypes.string).isRequired,
    createdAt: PropTypes.string.isRequired,
  }),
  setCurrentThread: PropTypes.func.isRequired,
};

export default ThreadBox;
