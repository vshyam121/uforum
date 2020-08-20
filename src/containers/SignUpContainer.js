import React, { Component } from 'react';
import { signUp, authReset } from '../store/auth/actions';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import SignUp from '../components/Forms/SignUp/SignUp';

/* User sign up form */
class SignUpContainer extends Component {
  state = {
    form: {
      firstName: {
        elementType: 'input',
        elementConfig: {
          placeholder: 'First Name',
        },
        value: '',
        errorMessage: 'Please enter a valid first name',
        validation: {
          required: true,
          isName: true,
          minLength: 2,
          maxLength: 50,
        },
        valid: false,
      },
      lastName: {
        elementType: 'input',
        elementConfig: {
          placeholder: 'Last Name',
        },
        value: '',
        errorMessage: 'Please enter a valid last name',
        validation: {
          required: true,
          isName: true,
          minLength: 2,
          maxLength: 50,
        },
        valid: false,
      },
      email: {
        elementType: 'input',
        elementConfig: {
          placeholder: 'Email',
        },
        value: '',
        errorMessage: 'Please enter a valid email address',
        validation: {
          required: true,
          isEmail: true,
        },
        valid: false,
      },
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
      this.props.signUp(
        this.state.form.firstName.value,
        this.state.form.lastName.value,
        this.state.form.email.value,
        this.state.form.username.value,
        this.state.form.password.value
      );
    }
  };

  updateForm = (stateUpdate) => {
    this.setState(stateUpdate);
  };

  componentWillUnmount() {
    this.props.authReset();
  }

  render() {
    return (
      <SignUp
        {...this.state}
        {...this.props}
        handleSubmit={this.handleSubmit}
        updateForm={this.updateForm}
      />
    );
  }
}

SignUpContainer.propTypes = {
  loadingUser: PropTypes.bool,
  error: PropTypes.object,
  isAuthenticated: PropTypes.object,
};

const mapStateToProps = (state) => ({
  loadingUser: state.auth.loadingUser,
  error: state.auth.signUpError,
  isAuthenticated: state.auth.user,
});

export default connect(mapStateToProps, { signUp, authReset })(SignUpContainer);
