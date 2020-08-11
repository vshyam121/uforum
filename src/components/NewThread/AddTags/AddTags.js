import React, { useRef } from 'react';
import './AddTags.scss';
import { FaPlusCircle } from 'react-icons/fa';
import Tag from '../../Tag/Tag';
import { EMPTY_TAG, DUPLICATE_TAG, INCORRECT_FORMAT_TAG } from '../NewThread';

const AddTags = (props) => {
  const { submitTag, deleteTag, tags, setError } = props;
  const inputRef = useRef(null);

  //const [error, setError] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    const incomingTag = inputRef.current.value;
    if (incomingTag.length === 0) {
      setError(EMPTY_TAG);
      return;
    } else if (tags.includes(incomingTag)) {
      setError(DUPLICATE_TAG);
      return;
    } else if (!/^([a-z0-9]){4,20}$/i.test(incomingTag)) {
      setError(INCORRECT_FORMAT_TAG);
      return;
    }
    if (incomingTag.length > 0 && !tags.includes(incomingTag)) {
      submitTag(incomingTag);
      setError(null);
      inputRef.current.value = '';
    }
  };
  let tagsContent = null;
  tagsContent = tags.map((tag, index) => {
    return (
      <Tag key={tag} delete={() => deleteTag(index)}>
        {tag}
      </Tag>
    );
  });

  return (
    <div className='add-tags'>
      <form className='add-tags__form' onSubmit={handleSubmit}>
        <label className='add-tags__label' htmlFor='tag'>
          Tags:
        </label>
        <div className='add-tags__tags'>{tagsContent}</div>
        <input
          ref={inputRef}
          className='add-tags__input'
          id='tag'
          type='text'
          placeholder='Tag Name...'
        />
        <FaPlusCircle className='add-tags__add' onClick={handleSubmit} />
      </form>
    </div>
  );
};

export default AddTags;
