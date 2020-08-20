import React from 'react';
import './Layout.scss';
import HeaderContainer from '../../containers/HeaderContainer';
import NavigationBar from './NavigationBar/NavigationBar';

const Layout = (props) => {
  return (
    //<div className='layout-container'>
    <div className='layout'>
      <HeaderContainer />
      <NavigationBar />
      <main className='main'>{props.children}</main>
    </div>
    //</div>
  );
};

export default Layout;
