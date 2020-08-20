import React from 'react';
import { connect } from 'react-redux';
import Dashboard from '../components/AdminDashboard/AdminDashboard';
import { deleteForum } from '../store/feeds/actions';

const AdminDashboardContainer = (props) => {
  return <Dashboard {...props} />;
};

const mapStateToProps = (state) => ({
  forums: state.feeds.forums,
  deletingForumId: state.feeds.deletingForumId,
  createForumError: state.feeds.createForumError,
});
export default connect(mapStateToProps, { deleteForum })(
  AdminDashboardContainer
);
