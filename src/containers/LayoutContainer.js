import React, { useState } from 'react';
import { withRouter, useLocation } from 'react-router-dom';
import { connect } from 'react-redux';
import { signOut } from '../store/auth/actions';
import Layout from '../components/Layout/Layout';
import PropTypes from 'prop-types';

const LayoutContainer = (props) => {
  const [showMenu, setShowMenu] = useState(false);

  const forumSlug = useLocation().pathname;

  const { user } = props;

  const handleMenuToggle = () => {
    setShowMenu((prevShowMenu) => !prevShowMenu);
  };

  const handleClickDashboard = () => {
    props.history.push('/admin');
  };

  const handleClickUserProfile = () => {
    props.history.push(`/user/${user.username}`);
  };

  const handleClickSignOut = () => {
    props.signOut();
  };

  return (
    <Layout
      {...props}
      forumSlug={forumSlug}
      showMenu={showMenu}
      handleClickDashboard={handleClickDashboard}
      handleClickSignOut={handleClickSignOut}
      handleClickUserProfile={handleClickUserProfile}
      handleMenuToggle={handleMenuToggle}
    />
  );
};

LayoutContainer.propTypes = {
  user: PropTypes.shape({
    username: PropTypes.string.isRequired,
    _id: PropTypes.string.isRequired,
  }),
};

const mapStateToProps = (state) => ({
  user: state.auth.user,
  forums: state.feeds.forums,
  gettingForums: state.feeds.gettingForums,
  getForumsError: state.feeds.getForumsError,
});

export default connect(mapStateToProps, { signOut })(
  withRouter(LayoutContainer)
);
