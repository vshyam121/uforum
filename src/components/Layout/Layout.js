import React from 'react';
import './Layout.scss';
import Header from './Header/Header';
import NavigationBar from './NavigationBar/NavigationBar';

const Layout = (props) => {
  return (
    //<div className='layout-container'>
    <div className='layout'>
      <Header />
      <NavigationBar />
      <main className='main'>{props.children}</main>
    </div>
    //</div>
  );
};

export default Layout;
