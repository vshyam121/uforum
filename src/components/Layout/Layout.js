import React from 'react';
import './Layout.scss';
import Header from './Header/Header';
import NavigationBar from './NavigationBar/NavigationBar';

const Layout = (props) => {
  return (
    <div className='layout'>
      <Header
        user={props.user}
        showMenu={props.showMenu}
        handleClickDashboard={props.handleClickDashboard}
        handleClickSignOut={props.handleClickSignOut}
        handleClickUserProfile={props.handleClickUserProfile}
        handleMenuToggle={props.handleMenuToggle}
      />
      <NavigationBar
        forums={props.forums}
        gettingForums={props.gettingForums}
        getForumsError={props.getForumsError}
        forumSlug={props.forumSlug}
      />
      <main className='main'>{props.children}</main>
    </div>
  );
};

export default Layout;
