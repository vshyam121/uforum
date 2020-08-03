import React from 'react';
import './NavigationBar.scss';

const NavigationBar = (props) => {
  const testArr = [1, 2, 3, 4];

  let forums = null;
  forums = testArr.map((element) => (
    <li className='navbar__forum'>
      <h2>React</h2>
    </li>
  ));
  return (
    <nav className='navbar'>
      <ul className='navbar__forum-list'>{forums}</ul>
    </nav>
  );
};

export default NavigationBar;
