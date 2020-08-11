import React from 'react';
import './Reply.scss';
import { FaUser } from 'react-icons/fa';
import Moment from 'moment';
import RichEditor from '../../RichEditor/RichEditor';

const Reply = (props) => {
  const { reply } = props;
  return (
    <div className='reply'>
      <div className='reply__top'>
        <div className='reply__userinfo'>
          <FaUser className='reply__usericon' />
          <div className='reply__username'>{reply.user.username}</div>
        </div>

        <div className='reply__age'> {Moment(reply.createdAt).fromNow()}</div>
      </div>
      <div className='reply__content'>
        <RichEditor readOnly content={reply.content} />
      </div>
    </div>
  );
};

export default Reply;
