import React from 'react';
import './Tag.scss';
import { FaTimes } from 'react-icons/fa';

const Tag = (props) => {
  let deleteTag = null;
  if (props.delete) {
    deleteTag = <FaTimes className='tag__delete' onClick={props.delete} />;
  }
  return (
    <div className='tag'>
      {props.children}
      {deleteTag}
    </div>
  );
};

export default Tag;
