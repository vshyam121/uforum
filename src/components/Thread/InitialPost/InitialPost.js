import React from 'react';
import './InitialPost.scss';
import Tag from '../../Tag/Tag';
import { FaUser, FaHeart, FaRegHeart, FaTrashAlt } from 'react-icons/fa';
import Moment from 'moment';
import RichEditor from '../../RichEditor/RichEditor';
import { ClipLoader } from 'react-spinners';
import { Link, withRouter } from 'react-router-dom';

const InitialPost = (props) => {
  const {
    thread,
    user,
    handleFavoriteThread,
    handleUnfavoriteThread,
    handleDeleteThread,
    deletingThread,
  } = props;

  let post = null;
  if (!thread || deletingThread) {
    post = (
      <div className='post__loading'>
        <ClipLoader size={50} />
      </div>
    );
  } else {
    let tags = null;
    tags = thread.tags.map((tag) => {
      return <Tag key={tag}>{tag}</Tag>;
    });

    let favorite = null;
    if (user) {
      if (thread.favorites.includes(user._id)) {
        favorite = (
          <button className='post__action' onClick={handleUnfavoriteThread}>
            <FaHeart className='post__action-icon' />
            <span>Unfavorite</span>
          </button>
        );
      } else {
        favorite = (
          <button className='post__action' onClick={handleFavoriteThread}>
            <FaRegHeart className='post__action-icon' />
            <span>Favorite</span>
          </button>
        );
      }
    }

    let deleteThreadContent = null;
    if (user && thread.user._id === user._id) {
      deleteThreadContent = (
        <button className='post__action' onClick={handleDeleteThread}>
          <FaTrashAlt className='post__action-icon' />
          <span>Delete</span>
        </button>
      );
    }

    post = (
      <React.Fragment>
        <div className='post__top'>
          <Link
            className='post__userinfo link'
            to={`/user/${thread.user.username}`}
          >
            <FaUser className='post__usericon' />
            <div className='post__username'>{thread.user.username}</div>
          </Link>
          <div className='post__age'>{Moment(thread.createdAt).fromNow()}</div>
        </div>
        <div className='post__title'>{thread.title}</div>
        <div className='post__content'>
          <RichEditor readOnly content={thread.content} />
        </div>
        <div className='post__bottom'>
          <div className='post__tags'>{tags}</div>
          <div className='post__actions'>
            {favorite}
            {deleteThreadContent}
          </div>
        </div>
      </React.Fragment>
    );
  }

  return <div className='post'>{post}</div>;
};

export default React.memo(withRouter(InitialPost));
