import React from 'react';
import './Header.scss';
import UForumLogo from '../../../images/uforum.png';
import { Link } from 'react-router-dom';
import { FaUserCircle } from 'react-icons/fa';
import DropDownMenu from '../../Theme/DropDownMenu/DropDownMenu';
import PropTypes from 'prop-types';

const Header = (props) => {
  const {
    user,
    showMenu,
    handleClickDashboard,
    handleClickSignOut,
    handleClickUserProfile,
    handleMenuToggle,
  } = props;

  let userInfo = (
    <Link className='header__auth link' to='/signin'>
      <h2>Sign up / Sign in</h2>
    </Link>
  );

  if (user) {
    let dashboard = null;
    if (user.role === 'admin') {
      dashboard = (
        <div className='header__menu-item' onClick={handleClickDashboard}>
          <span>Admin Dashboard</span>
        </div>
      );
    }
    userInfo = (
      <div className='header__menu' onClick={handleMenuToggle}>
        <div className='header__user'>
          <FaUserCircle className='header__usericon' />
          <div className='header__username'>{user.username}</div>
        </div>
        <DropDownMenu show={showMenu}>
          {dashboard}
          <div className='header__menu-item' onClick={handleClickUserProfile}>
            <span>My Profile</span>
          </div>
          <div className='header__menu-item' onClick={handleClickSignOut}>
            <span>Sign Out</span>
          </div>
        </DropDownMenu>
      </div>
    );
  }

  return (
    <header className='header'>
      <Link to='/' className='header__logo-title link'>
        <img className='header__logo' src={UForumLogo} alt='UForum logo' />
        <h1>UForum</h1>
      </Link>
      {userInfo}
    </header>
  );
};

Header.propTypes = {
  user: PropTypes.shape({
    username: PropTypes.string.isRequired,
    _id: PropTypes.string.isRequired,
  }),
  showMenu: PropTypes.bool.isRequired,
  handleClickDashboard: PropTypes.func.isRequired,
  handleClickSignOut: PropTypes.func.isRequired,
  handleClickUserProfile: PropTypes.func.isRequired,
  handleMenuToggle: PropTypes.func.isRequired,
};

export default Header;
