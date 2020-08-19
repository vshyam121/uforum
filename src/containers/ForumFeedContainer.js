import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { getUnpinnedThreads, getPinnedThreads } from '../store/feeds/actions';
import { setCurrentThread } from '../store/thread/actions';
import { useParams } from 'react-router';
import ForumFeed from '../components/ForumFeed/ForumFeed';
import find from 'lodash/find';

const ForumFeedContainer = (props) => {
  const currentForumSlug = useParams().forumSlug;

  const { forums, getUnpinnedThreads, getPinnedThreads } = props;

  const [forumFound, setForumFound] = useState(false);
  const [forumSlug, setForumSlug] = useState(null);
  const [forumId, setForumId] = useState(null);
  const [sortingMethod, setSortingMethod] = useState('date');

  useEffect(() => {
    let forumId = null;
    if (forums) {
      if (currentForumSlug) {
        const forum = find(forums, { slug: currentForumSlug });
        if (forum) {
          forumId = forum._id;
          setForumSlug(forum.slug);
        }
      } else if (forums.length > 0) {
        forumId = forums[0]._id;
        setForumSlug(forums[0].slug);
      }

      if (!forumId) {
        setForumFound(false);
      } else {
        setForumFound(true);
        setForumId(forumId);
        setSortingMethod('date');
        getUnpinnedThreads(forumId);
        getPinnedThreads(forumId);
      }
    }
  }, [forums, currentForumSlug, getUnpinnedThreads, getPinnedThreads]);

  const handleGetThreads = (sortingMethod) => {
    getUnpinnedThreads(forumId, sortingMethod);
  };

  return (
    <ForumFeed
      {...props}
      forums={forums}
      forumFound={forumFound}
      sortingMethod={sortingMethod}
      forumSlug={forumSlug}
      handleGetThreads={handleGetThreads}
      setSortingMethod={setSortingMethod}
    />
  );
};

const mapStateToProps = (state) => ({
  forums: state.feeds.forums,
  gettingForums: state.feeds.gettingForums,
  getForumsError: state.feeds.getForumsError,

  gettingUnpinnedThreads: state.feeds.gettingUnpinnedThreads,
  unpinnedThreads: state.feeds.unpinnedThreads,
  getUnpinnedThreadsError: state.feeds.getUnpinnedThreadsError,

  gettingPinnedThreads: state.feeds.gettingPinnedThreads,
  pinnedThreads: state.feeds.pinnedThreads,
  getPinnedThreadsError: state.feeds.getPinnedThreadsError,
});
export default connect(mapStateToProps, {
  getUnpinnedThreads,
  getPinnedThreads,
  setCurrentThread,
})(ForumFeedContainer);
