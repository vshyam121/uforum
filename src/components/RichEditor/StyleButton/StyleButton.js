import React from 'react';
import './StyleButton.scss';

const StyleButton = (props) => {
  const onToggle = (e) => {
    e.preventDefault();
    props.onToggle(props.style);
  };

  let className = 'style-button';
  if (props.active) {
    className += ' style-button--active';
  }
  return (
    <span className={className} onMouseDown={onToggle}>
      {props.label}
    </span>
  );
};

export default StyleButton;
