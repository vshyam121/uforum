import React from 'react';
import Layout from './components/Layout/Layout';
import ForumFeed from './components/ForumFeed/ForumFeed';
import Thread from './components/Thread/Thread';
import { Switch, Route } from 'react-router-dom';

function App() {
  return (
    <Layout>
      <Switch>
        <Route exact path='/' component={ForumFeed} />
        <Route exact path='/:forum' component={ForumFeed} />
        <Route exact path='/:forum/discussion/:discussion' component={Thread} />
      </Switch>
    </Layout>
  );
}

export default App;
