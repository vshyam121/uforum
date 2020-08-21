import React from 'react';
import './Tag.scss';
import { FaTimes } from 'react-icons/fa';

/* Component for tags associated with a thread's initial post */
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
