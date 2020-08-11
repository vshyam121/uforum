import React, { useEffect } from 'react';
import Layout from './components/Layout/Layout';
import ForumFeedContainer from './containers/ForumFeedContainer';
import ThreadContainer from './containers/ThreadContainer';
import { Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { authenticateToken } from './store/auth/actions';
import { getAllForums } from './store/forum/actions';
import NewThread from './components/NewThread/NewThread';
import SignInContainer from './containers/SignInContainer';
import SignUpContainer from './containers/SignUpContainer';
import UserProfile from './components/UserProfile/UserProfile';

function App(props) {
  useEffect(() => {
    props.authenticateToken();
    props.getAllForums();
  });

  return (
    <Layout>
      <Switch>
        <Route exact path='/signin' component={SignInContainer} />
        <Route exact path='/signup' component={SignUpContainer} />
        <Route exact path='/' component={ForumFeedContainer} />
        <Route exact path='/:forumSlug' component={ForumFeedContainer} />
        <Route exact path='/user/:username' component={UserProfile} />
        <Route
          exact
          path='/:forumSlug/thread/:threadSlug'
          component={ThreadContainer}
        />
        <Route exact path='/:forumSlug/new-thread' component={NewThread} />
      </Switch>
    </Layout>
  );
}

export default connect(null, { getAllForums, authenticateToken })(App);
