import React from 'react';
import './Button.scss';

const Button = (props) => {
  return (
    <button className='button'>
      <h2>{props.children}</h2>
    </button>
  );
};

export default Button;
