import React from 'react';
import './AdminDashboard.scss';
import { FaTrashAlt } from 'react-icons/fa';
import CreateForumContainer from '../../containers/CreateForumContainer';
import PropTypes from 'prop-types';

/* Admin dashboard component for deleting and creating forums */
const AdminDashboard = (props) => {
  const { user, forums, deleteForum, deletingForumId } = props;

  let dashboardContent = null;
  if (user && user.role === 'admin') {
    dashboardContent = (
      <React.Fragment>
        <div className='dashboard__forums'>
          <div className='dashboard__title'>
            <h2>Forums</h2>
          </div>
          {forums &&
            forums.map((forum) => {
              let deleteForumContent = null;
              if (deletingForumId === forum._id) {
                deleteForumContent = (
                  <span className='dashboard__delete'>Deleting...</span>
                );
              } else {
                deleteForumContent = (
                  <div
                    className='dashboard__delete'
                    onClick={() => deleteForum(forum._id)}
                  >
                    <FaTrashAlt className='dashboard__delete-icon' />
                    <span>Delete</span>
                  </div>
                );
              }
              return (
                <div key={forum.name} className='dashboard__forum'>
                  <div className='dashboard__forum-name'>{forum.name}</div>
                  {deleteForumContent}
                </div>
              );
            })}
        </div>
        <CreateForumContainer />
      </React.Fragment>
    );
  } else {
    dashboardContent = (
      <div className='dashboard__privileges'>
        You do not have sufficient privileges to view this page.
      </div>
    );
  }
  return <div className='dashboard'>{dashboardContent}</div>;
};

AdminDashboard.propTypes = {
  forums: PropTypes.arrayOf(PropTypes.object),
  deletingForumId: PropTypes.string,
  deleteForum: PropTypes.func.isRequired,
};

export default AdminDashboard;
