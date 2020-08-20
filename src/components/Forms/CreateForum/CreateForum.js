import React from 'react';
import './CreateForum.scss';
import { ClipLoader } from 'react-spinners';
import Form from '../../Theme/Form/Form';
import PropTypes from 'prop-types';

/* Small form for creating a forum */
const CreateForum = (props) => {
  let form = (
    <Form
      {...props}
      onSubmit={props.handleSubmit}
      updateForm={props.updateForm}
    />
  );
  if (props.creatingForum) {
    form = (
      <div className='create-forum__loading'>
        <ClipLoader size={50} />
      </div>
    );
  }

  let errorMessage = null;
  if (props.error) {
    errorMessage = <div className='create-forum__error'>{props.error}</div>;
  }

  return (
    <div className='create-forum'>
      <h2 className='create-forum__title'>Create a forum</h2>
      <div className='form-component'>
        {errorMessage}
        {form}
      </div>
    </div>
  );
};

CreateForum.propTypes = {
  creatingForum: PropTypes.bool.isRequired,
  createdForum: PropTypes.bool.isRequired,
  error: PropTypes.string,
};

export default CreateForum;
