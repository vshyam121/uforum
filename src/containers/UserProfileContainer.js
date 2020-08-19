import React, { useEffect } from 'react';
import { getUserThreads, getUserProfile } from '../store/feeds/actions';
import { setCurrentThread } from '../store/thread/actions';
import { connect } from 'react-redux';
import { useParams } from 'react-router';
import UserProfile from '../components/UserProfile/UserProfile';

const UserProfileContainer = (props) => {
  const { username } = useParams();
  const { getUserThreads, getUserProfile } = props;

  useEffect(() => {
    getUserProfile(username);
    getUserThreads(username);
  }, [username, getUserThreads, getUserProfile]);

  return <UserProfile {...props} />;
};

const mapStateToProps = (state) => ({
  userThreads: state.feeds.userThreads,
  gettingUserThreads: state.feeds.gettingUserThreads,
  getUserThreadsError: state.feeds.getUserThreadsError,
  userProfile: state.feeds.userProfile,
  gettingUserProfile: state.feeds.gettingUserProfile,
  getUserProfileError: state.feeds.getUserProfileError,
});

export default connect(mapStateToProps, {
  setCurrentThread,
  getUserThreads,
  getUserProfile,
})(UserProfileContainer);
