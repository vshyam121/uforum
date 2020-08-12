import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import {
  getUnpinnedThreads,
  getPinnedThreads,
  setCurrentThread,
} from '../store/forum/actions';
import { useParams } from 'react-router';
import ForumFeed from '../components/ForumFeed/ForumFeed';
import find from 'lodash/find';

const ForumFeedContainer = (props) => {
  const currentForumSlug = useParams().forumSlug;

  const {
    forums,
    unpinnedThreads,
    gettingUnpinnedThreads,
    pinnedThreads,
    gettingPinnedThreads,
    getUnpinnedThreads,
    getPinnedThreads,
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
        getUnpinnedThreads(forumId);
        getPinnedThreads(forumId);
      }
    }
  }, [forums, currentForumSlug, getUnpinnedThreads, getPinnedThreads]);

  console.log(forumSlug);
  let forumFeed = null;
  if (forumFound) {
    forumFeed = (
      <ForumFeed
        forums={forums}
        unpinnedThreads={unpinnedThreads}
        gettingUnpinnedThreads={gettingUnpinnedThreads}
        forumSlug={forumSlug}
        pinnedThreads={pinnedThreads}
        gettingPinnedThreads={gettingPinnedThreads}
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
  gettingPinnedThreads: state.forum.gettingPinnedThreads,
  unpinnedThreads: state.forum.unpinnedThreads,
  gettingUnpinnedThreads: state.forum.gettingUnpinnedThreads,
});
export default connect(mapStateToProps, {
  getUnpinnedThreads,
  getPinnedThreads,
  setCurrentThread,
})(ForumFeedContainer);
