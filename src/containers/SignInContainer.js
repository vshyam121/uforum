import React, { Component } from 'react';
import { signIn, authReset } from '../store/auth/actions';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import SignIn from '../components/Forms/SignIn/SignIn';

/* Sign in form container */
class SignInContainer extends Component {
  state = {
    form: {
      username: {
        elementType: 'input',
        elementConfig: {
          placeholder: 'Username',
        },
        value: '',
        errorMessage:
          'Username has to be at least 6 characters long and can only contain numbers and letters',
        validation: {
          required: true,
          isUsername: true,
          minLength: 6,
        },
        valid: false,
      },
      password: {
        elementType: 'input',
        elementConfig: {
          type: 'password',
          placeholder: 'Password',
        },
        value: '',
        errorMessage: 'Password has to be at least 6 characters long',
        validation: {
          required: true,
          minLength: 6,
        },
        valid: false,
      },
    },
    formIsValid: false,
    formSubmitted: false,
  };

  handleSubmit = (event) => {
    event.preventDefault();
    this.setState({ formSubmitted: true });
    if (this.state.formIsValid) {
      this.props.signIn(
        this.state.form.username.value,
        this.state.form.password.value
      );
    }
  };

  updateForm = (stateUpdate) => {
    this.setState(stateUpdate);
  };

  componentWillUnmount() {
    if (this.props.error) {
      this.props.authReset();
    }
  }

  render() {
    return (
      <SignIn
        {...this.state}
        {...this.props}
        handleSubmit={this.handleSubmit}
        updateForm={this.updateForm}
      />
    );
  }
}

SignInContainer.propTypes = {
  loadingUser: PropTypes.bool,
  error: PropTypes.object,
  isAuthenticated: PropTypes.object,
};

const mapStateToProps = (state) => ({
  loadingUser: state.auth.loadingUser,
  error: state.auth.signInError,
  isAuthenticated: state.auth.user,
});

export default connect(mapStateToProps, { signIn, authReset })(SignInContainer);
