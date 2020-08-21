import React from 'react';
import './UserProfile.scss';
import FeedBox from '../ForumFeed/FeedBox/FeedBox';
import { FaUser } from 'react-icons/fa';
import { ClipLoader } from 'react-spinners';
import PropTypes from 'prop-types';

const UserProfile = (props) => {
  const {
    userThreads,
    gettingUserThreads,
    getUserThreadsError,
    userProfile,
    gettingUserProfile,
    getUserProfileError,
    setCurrentThread,
  } = props;

  let userProfileContent = null;
  if (getUserProfileError) {
    userProfileContent = (
      <div className='user-profile__error'>{getUserProfileError}</div>
    );
  } else if (gettingUserProfile || !userProfile) {
    userProfileContent = (
      <div className='user-profile__loading'>
        <ClipLoader size={50} />
      </div>
    );
  } else {
    userProfileContent = (
      <div className='user-profile__top'>
        <FaUser className='user-profile__usericon' />
        <div className='user-profile__userinfo'>
          <div className='user-profile__username'>
            <span className='user-profile__label'>Username: </span>
            <span>{userProfile.username}</span>
          </div>
          <div className='user-profile__name'>
            <span className='user-profile__label'>Name: </span>
            <span>
              {userProfile.firstName} {userProfile.lastName}
            </span>
          </div>
          <div className='user-profile__email'>
            <span className='user-profile__label'>Email: </span>
            <span>{userProfile.email}</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className='user-profile'>
      {userProfileContent}
      <FeedBox
        title='Threads'
        threads={userThreads}
        gettingThreads={gettingUserThreads}
        setCurrentThread={setCurrentThread}
        error={getUserThreadsError}
        hideUser
      />
    </div>
  );
};

UserProfile.propTypes = {
  userThreads: PropTypes.array,
  gettingUserThreads: PropTypes.bool.isRequired,
  getUserThreadsError: PropTypes.string,
  userProfile: PropTypes.object,
  gettingUserProfile: PropTypes.bool.isRequired,
  getUserProfileError: PropTypes.string,
  setCurrentThread: PropTypes.func.isRequired,
};

export default UserProfile;
