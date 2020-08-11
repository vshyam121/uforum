import React, { useState } from 'react';
import './Header.scss';
import UForumLogo from '../../../images/uforum.png';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { FaUserCircle } from 'react-icons/fa';
import DropDownMenu from '../../Theme/DropDownMenu/DropDownMenu';
import { signOut } from '../../../store/auth/actions';

const Header = (props) => {
  let userInfo = (
    <Link className='header__auth link' to='/signin'>
      <h2>Sign up / Sign in</h2>
    </Link>
  );

  const [showMenu, setShowMenu] = useState(false);

  const handleMenuToggle = () => {
    setShowMenu((prevShowMenu) => !prevShowMenu);
  };

  const handleSignOut = () => {
    props.signOut();
  };

  if (props.user) {
    userInfo = (
      <div className='header__menu' onClick={handleMenuToggle}>
        <div className='header__user'>
          <FaUserCircle className='header__usericon' />
          <div className='header__username'>{props.user.username}</div>
        </div>
        <DropDownMenu show={showMenu}>
          <Link
            className='header__profile link'
            to={`/user/${props.user.username}`}
          >
            My Profile
          </Link>
          <button className='header__signout' onClick={handleSignOut}>
            <span>Sign Out</span>
          </button>
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

export default connect(mapStateToProps, { signOut })(Header);
