import React from 'react';
import './Tag.scss';

const Tag = (props) => {
  return <div className='tag'>{props.children}</div>;
};

export default Tag;
