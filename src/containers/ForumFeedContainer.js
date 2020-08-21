import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { getUnpinnedThreads, getPinnedThreads } from '../store/feeds/actions';
import { setCurrentThread } from '../store/thread/actions';
import { useParams } from 'react-router';
import ForumFeed from '../components/ForumFeed/ForumFeed';
import find from 'lodash/find';
import PropTypes from 'prop-types';

/* Container for a forum's feed of threads */
const ForumFeedContainer = (props) => {
  const currentForumSlug = useParams().forumSlug;

  const { forums, getUnpinnedThreads, getPinnedThreads } = props;

  const [forumFound, setForumFound] = useState(false);
  const [forumSlug, setForumSlug] = useState(null);
  const [forumId, setForumId] = useState(null);
  const [sortingMethod, setSortingMethod] = useState('date');

  useEffect(() => {
    let forumId = null;
    //Only if able to get forums
    if (forums) {
      //If a forum slug exists
      if (currentForumSlug) {
        const forum = find(forums, { slug: currentForumSlug });
        //If slug matches a forum, then set forum slug
        if (forum) {
          forumId = forum._id;
          setForumSlug(forum.slug);
        }
      }
      //Otherwise, default to first forum in array of forums
      else if (forums.length > 0) {
        forumId = forums[0]._id;
        setForumSlug(forums[0].slug);
      }

      //If no matching forum id is found, then set forum not found
      if (!forumId) {
        setForumFound(false);
      }
      //If matching forum id is found, set state based on forumId
      else {
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

ForumFeedContainer.propTypes = {
  forums: PropTypes.array,
  gettingForums: PropTypes.bool.isRequired,
  getForumsError: PropTypes.string,

  gettingUnpinnedThreads: PropTypes.bool.isRequired,
  unpinnedThreads: PropTypes.array,
  getUnpinnedThreadsError: PropTypes.string,

  gettingPinnedThreads: PropTypes.bool.isRequired,
  pinnedThreads: PropTypes.array,
  getPinnedThreadsError: PropTypes.string,
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
