import React, { useEffect } from 'react';
import './UserProfile.scss';
import {
  setCurrentThread,
  getUserThreads,
  getUserProfile,
} from '../../store/forum/actions';
import FeedBox from '../ForumFeed/FeedBox/FeedBox';
import { connect } from 'react-redux';
import { useParams } from 'react-router';
import { FaUser } from 'react-icons/fa';
import { ClipLoader } from 'react-spinners';

const UserProfile = (props) => {
  const { username } = useParams();
  const {
    userThreads,
    gettingUserThreads,
    getUserThreads,
    getUserProfile,
    userProfile,
  } = props;

  useEffect(() => {
    console.log('getting user threads: ' + username);
    getUserProfile(username);
    getUserThreads(username);
  }, [username, getUserThreads, getUserProfile]);

  let userProfileContent = null;
  if (!userProfile) {
    userProfileContent = (
      <div className='user-profile__loading'>
        <ClipLoader size={50} />
      </div>
    );
  }
  if (userProfile) {
    userProfileContent = (
      <div className='user-profile__top'>
        <FaUser className='user-profile__usericon' />
        <div className='user-profile__userinfo'>
          <span>{userProfile.username}</span>
          <span>
            {userProfile.firstName} {userProfile.lastName}
          </span>
          <span>{userProfile.email}</span>
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
      />
    </div>
  );
};

const mapStateToProps = (state) => ({
  userThreads: state.forum.userThreads,
  gettingUserThreads: state.forum.gettingUserThreads,
  userProfile: state.forum.userProfile,
});

export default connect(mapStateToProps, {
  setCurrentThread,
  getUserThreads,
  getUserProfile,
})(UserProfile);
