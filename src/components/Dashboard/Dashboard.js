import React from 'react';
import './Dashboard.scss';
import { FaTrashAlt } from 'react-icons/fa';
import CreateForumContainer from '../../containers/CreateForumContainer';

const Dashboard = (props) => {
  const { forums, deleteForum, deletingForumId } = props;
  return (
    <div className='dashboard'>
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
    </div>
  );
};

export default Dashboard;
