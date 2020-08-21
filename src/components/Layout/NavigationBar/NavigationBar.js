import React from 'react';
import './NavigationBar.scss';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const NavigationBar = (props) => {
  const { forumSlug } = props;

  let forums = null;
  if (props.gettingForums) {
    forums = <div className='navbar__loading'>Loading...</div>;
  } else if (props.forums) {
    forums = props.forums.map((forum, index) => {
      let linkClassNames = ['navbar__forum'];
      if (forumSlug === `/${forum.slug}`) {
        linkClassNames.push('navbar__forum--selected');
      }
      if (forumSlug === '/' && index === 0) {
        linkClassNames.push('navbar__forum--selected');
      }
      return (
        <li key={forum.slug} className={linkClassNames.join(' ')}>
          <Link className='navbar__link link' to={`/${forum.slug}`}>
            <span>{forum.name}</span>
          </Link>
        </li>
      );
    });
  }
  return (
    <nav className='navbar'>
      <ul className='navbar__forum-list'>{forums}</ul>
    </nav>
  );
};

PropTypes.NavigationBar = {
  forums: PropTypes.array.isRequired,
  forumSlug: PropTypes.string.isRequired,
};

export default NavigationBar;
