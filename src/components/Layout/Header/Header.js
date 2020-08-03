import React from 'react';
import './Header.scss';
import UForumLogo from '../../../images/uforum.png';

const Header = (props) => {
  return (
    <header className='header'>
      <div className='header__logo-title'>
        <img className='header__logo' src={UForumLogo} alt='UForum logo' />
        <h1>UForum</h1>
      </div>
      <div className='header__auth'>
        <h2>Sign up / Sign in</h2>
      </div>
    </header>
  );
};

export default Header;
