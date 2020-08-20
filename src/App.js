import React, { useEffect } from 'react';
import Layout from './components/Layout/Layout';
import ForumFeedContainer from './containers/ForumFeedContainer';
import ThreadContainer from './containers/ThreadContainer';
import { Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { authenticateToken } from './store/auth/actions';
import { getAllForums } from './store/feeds/actions';
import SignInContainer from './containers/SignInContainer';
import SignUpContainer from './containers/SignUpContainer';
import NewThreadContainer from './containers/NewThreadContainer';
import UserProfileContainer from './containers/UserProfileContainer';
import AdminDashboardContainer from './containers/AdminDashboardContainer';

function App(props) {
  const { authenticateToken, getAllForums } = props;
  useEffect(() => {
    authenticateToken();
    getAllForums();
  }, [authenticateToken, getAllForums]);

  return (
    <Layout>
      <Switch>
        <Route exact path='/signin' component={SignInContainer} />
        <Route exact path='/signup' component={SignUpContainer} />
        <Route exact path='/admin' component={AdminDashboardContainer} />
        <Route exact path='/' component={ForumFeedContainer} />
        <Route exact path='/:forumSlug' component={ForumFeedContainer} />
        <Route exact path='/user/:username' component={UserProfileContainer} />
        <Route
          exact
          path='/:forumSlug/thread/:threadSlug'
          component={ThreadContainer}
        />
        <Route
          exact
          path='/:forumSlug/new-thread'
          component={NewThreadContainer}
        />
      </Switch>
    </Layout>
  );
}

export default connect(null, { getAllForums, authenticateToken })(App);
