import React from 'react';
import './DropDownMenu.scss';

const DropDownMenu = (props) => {
  let classNames = ['drop-down-menu'];
  if (!props.show) {
    classNames.push('drop-down-menu__hide');
  }
  return (
    <div className={classNames.join(' ')}>
      <ul className='drop-down-menu__list'>
        {props.children.map((child, index) => {
          if (child) {
            return (
              <li key={index} className='drop-down-menu__item'>
                {child}
              </li>
            );
          }
          return null;
        })}
      </ul>
    </div>
  );
};

export default DropDownMenu;
