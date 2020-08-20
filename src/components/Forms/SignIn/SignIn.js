import React from 'react';
import './SignIn.scss';
import Button from '../../Theme/Button/Button';
import { ClipLoader } from 'react-spinners';
import { Redirect } from 'react-router-dom';
import Form from '../../Theme/Form/Form';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

/* Sign in form */
const SignIn = (props) => {
  let form = (
    <React.Fragment>
      <Form
        {...props}
        onSubmit={props.handleSubmit}
        updateForm={props.updateForm}
      />
      <h2 className='form-component__title'>Don't have an account?</h2>
      <div className='signup'>
        <Link to='/signup'>
          <Button>Sign Up</Button>
        </Link>
      </div>
    </React.Fragment>
  );
  if (props.loadingUser) {
    form = (
      <div className='spinner'>
        <ClipLoader size={50} />
      </div>
    );
  }

  let errorMessage = null;
  let error = null;
  if (props.error) {
    if (props.error.status === 500) {
      error = 'Internal server error.';
    } else {
      error = props.error.data.error;
    }
    errorMessage = <div className='form-component__error'>{error}</div>;
  }

  let redirect = null;
  if (props.isAuthenticated) {
    redirect = <Redirect to='/' />;
  }

  return (
    <div className='form-container'>
      <div className='form-component'>
        <h2 className='form-component__title'>
          Please sign in to your account
        </h2>
        {redirect}
        {errorMessage}
        {form}
      </div>
    </div>
  );
};

SignIn.propTypes = {
  loadingUser: PropTypes.bool.isRequired,
  error: PropTypes.object,
  isAuthenticated: PropTypes.object,
};

export default SignIn;
