import React from 'react';
import { connect } from 'react-redux';
import AdminDashboard from '../components/AdminDashboard/AdminDashboard';
import { deleteForum } from '../store/feeds/actions';
import PropTypes from 'prop-types';

/* Container for admin's dashboard for creating/deleting forums */
const AdminDashboardContainer = (props) => {
  return <AdminDashboard {...props} />;
};

AdminDashboardContainer.propTypes = {
  forums: PropTypes.array,
  deletingForumId: PropTypes.string,
  createForumError: PropTypes.string,
};

const mapStateToProps = (state) => ({
  forums: state.feeds.forums,
  deletingForumId: state.feeds.deletingForumId,
  createForumError: state.feeds.createForumError,
});

export default connect(mapStateToProps, { deleteForum })(
  AdminDashboardContainer
);
