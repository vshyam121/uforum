import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import {
  getUnpinnedThreadsForForum,
  getPinnedThreadsForForum,
  setCurrentThread,
} from '../store/forum/actions';
import { useParams } from 'react-router';
import ForumFeed from '../components/ForumFeed/ForumFeed';
import find from 'lodash/find';

const ForumFeedContainer = (props) => {
  const currentForumSlug = useParams().forumSlug;

  const {
    forums,
    threads,
    pinnedThreads,
    getUnpinnedThreadsForForum,
    getPinnedThreadsForForum,
    setCurrentThread,
  } = props;

  const [forumFound, setForumFound] = useState(true);
  const [forumSlug, setForumSlug] = useState(null);

  useEffect(() => {
    let forumId = null;
    if (forums && forums.length > 0) {
      if (currentForumSlug) {
        const forum = find(forums, { slug: currentForumSlug });
        if (forum) {
          forumId = forum._id;
          setForumSlug(forum.slug);
        }
      } else {
        forumId = forums[0]._id;
        setForumSlug(forums[0].slug);
      }
      if (!forumId) {
        setForumFound(false);
      } else {
        setForumFound(true);
        getUnpinnedThreadsForForum(forumId);
        getPinnedThreadsForForum(forumId);
      }
    }
  }, [
    forums,
    currentForumSlug,
    getUnpinnedThreadsForForum,
    getPinnedThreadsForForum,
  ]);

  console.log(forumSlug);
  let forumFeed = null;
  if (forumFound) {
    forumFeed = (
      <ForumFeed
        forums={forums}
        threads={threads}
        forumSlug={forumSlug}
        pinnedThreads={pinnedThreads}
        setCurrentThread={setCurrentThread}
      />
    );
  }

  return forumFeed;
};

const mapStateToProps = (state) => ({
  forums: state.forum.forums,
  threads: state.forum.threads,
  pinnedThreads: state.forum.pinnedThreads,
});
export default connect(mapStateToProps, {
  getUnpinnedThreadsForForum,
  getPinnedThreadsForForum,
  setCurrentThread,
})(ForumFeedContainer);
