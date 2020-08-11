import React from 'react';
import './NavigationBar.scss';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { useLocation } from 'react-router';
import { Link } from 'react-router-dom';

const NavigationBar = (props) => {
  const forumSlug = useLocation().pathname;

  let forums = null;
  if (props.forums) {
    forums = props.forums.map((forum, index) => {
      let linkClassNames = ['navbar__forum'];
      console.log(forumSlug);
      console.log(forum.slug);
      if (forumSlug === `/${forum.slug}`) {
        linkClassNames.push('navbar__forum--selected');
      }
      if (forumSlug === '/' && index === 0) {
        linkClassNames.push('navbar__forum--selected');
      }
      return (
        <Link key={forum.slug} className='link' to={`/${forum.slug}`}>
          <li className={linkClassNames.join(' ')}>
            <h2>{forum.name}</h2>
          </li>
        </Link>
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
};

const mapStateToProps = (state) => ({
  forums: state.forum.forums,
});

export default connect(mapStateToProps, null)(NavigationBar);
