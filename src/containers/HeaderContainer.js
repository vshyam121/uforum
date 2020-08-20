import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { signOut } from '../store/auth/actions';
import Header from '../components/Layout/Header/Header';
import PropTypes from 'prop-types';

const HeaderContainer = (props) => {
  const [showMenu, setShowMenu] = useState(false);

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
    <Header
      user={user}
      showMenu={showMenu}
      handleClickDashboard={handleClickDashboard}
      handleClickSignOut={handleClickSignOut}
      handleClickUserProfile={handleClickUserProfile}
      handleMenuToggle={handleMenuToggle}
    />
  );
};

HeaderContainer.propTypes = {
  user: PropTypes.shape({
    username: PropTypes.string.isRequired,
    _id: PropTypes.string.isRequired,
  }),
};

const mapStateToProps = (state) => ({
  user: state.auth.user,
});

export default connect(mapStateToProps, { signOut })(
  withRouter(HeaderContainer)
);
