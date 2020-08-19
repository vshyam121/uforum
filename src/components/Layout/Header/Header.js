import React, { useState } from 'react';
import './Header.scss';
import UForumLogo from '../../../images/uforum.png';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { FaUserCircle } from 'react-icons/fa';
import DropDownMenu from '../../Theme/DropDownMenu/DropDownMenu';
import { signOut } from '../../../store/auth/actions';

const Header = (props) => {
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
          <span>Dashboard</span>
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

const mapStateToProps = (state) => ({
  user: state.auth.user,
});

export default connect(mapStateToProps, { signOut })(withRouter(Header));
