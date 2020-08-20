import React from 'react';
import './InitialPost.scss';
import Tag from '../../Tag/Tag';
import { FaUser, FaHeart, FaRegHeart, FaTrashAlt } from 'react-icons/fa';
import { AiFillPushpin, AiOutlinePushpin } from 'react-icons/ai';
import Moment from 'moment';
import RichTextEditor from '../../RichTextEditor/RichTextEditor';
import { ClipLoader } from 'react-spinners';
import { Link, withRouter } from 'react-router-dom';

const InitialPost = (props) => {
  const {
    thread,
    user,
    handleFavoriteThread,
    handleUnfavoriteThread,
    handleDeleteThread,
    handleSetPinnedStatus,
    deletingThread,
    togglingFavorite,
    togglingPin,
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
      if (togglingFavorite) {
        favorite = <div className='post__action'>Toggling favorite...</div>;
      } else if (thread.favorites.includes(user._id)) {
        favorite = (
          <div className='post__action' onClick={handleUnfavoriteThread}>
            <FaHeart className='post__action-icon' />
            <span>Unfavorite</span>
          </div>
        );
      } else {
        favorite = (
          <div className='post__action' onClick={handleFavoriteThread}>
            <FaRegHeart className='post__action-icon' />
            <span>Favorite</span>
          </div>
        );
      }
    }

    let deleteThreadContent = null;
    if (user && (thread.user._id === user._id || user.role === 'admin')) {
      deleteThreadContent = (
        <div className='post__action' onClick={handleDeleteThread}>
          <FaTrashAlt className='post__action-icon' />
          <span>Delete</span>
        </div>
      );
    }

    let pinThreadContent = null;
    if (user && user.role === 'admin') {
      let pinAction = null;
      if (togglingPin) {
        pinAction = 'Toggling pin...';
      } else if (thread.pinned) {
        pinAction = (
          <React.Fragment>
            <AiFillPushpin className='post__pin' />
            <span>Unpin</span>
          </React.Fragment>
        );
      } else {
        pinAction = (
          <React.Fragment>
            <AiOutlinePushpin className='post__pin' />
            <span>Pin</span>
          </React.Fragment>
        );
      }
      pinThreadContent = (
        <div
          className='post__action'
          onClick={() => handleSetPinnedStatus(!thread.pinned)}
        >
          {pinAction}
        </div>
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
          <RichTextEditor readOnly content={thread.content} />
        </div>
        <div className='post__bottom'>
          <div className='post__tags'>{tags}</div>
          <div className='post__actions'>
            {pinThreadContent}
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
