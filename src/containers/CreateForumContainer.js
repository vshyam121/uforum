import React, { Component } from 'react';
import { createForum, resetCreateForum } from '../store/feeds/actions';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import CreateForum from '../components/Forms/CreateForum/CreateForum';

/* Create forum form */
class CreateForumContainer extends Component {
  initialForm = {
    forumName: {
      elementType: 'input',
      elementConfig: {
        placeholder: 'Forum Name',
      },
      value: '',
      errorMessage:
        'Forum name can only contain letters. Min 4 chars and max 15 chars.',
      validation: {
        required: true,
        isName: true,
        minLength: 4,
        maxLength: 15,
      },
      valid: false,
    },
  };

  state = {
    form: this.initialForm,
    formIsValid: false,
    formSubmitted: false,
  };

  handleSubmit = (event) => {
    event.preventDefault();
    this.setState({ formSubmitted: true });
    if (this.state.formIsValid) {
      this.props.createForum(this.state.form.forumName.value);
    }
  };

  componentDidUpdate() {
    if (this.props.createdForum) {
      this.setState({
        form: this.initialForm,
        formSubmitted: false,
        formIsValid: false,
      });
    }
    this.props.resetCreateForum();
  }

  updateForm = (stateUpdate) => {
    this.setState(stateUpdate);
  };

  render() {
    return (
      <CreateForum
        {...this.state}
        {...this.props}
        handleSubmit={this.handleSubmit}
        updateForm={this.updateForm}
      />
    );
  }
}

CreateForumContainer.propTypes = {
  error: PropTypes.string,
  createdForum: PropTypes.bool.isRequired,
  creatingForum: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  error: state.feeds.createForumError,
  createdForum: state.feeds.createdForum,
  creatingForum: state.feeds.creatingForum,
});

export default connect(mapStateToProps, { createForum, resetCreateForum })(
  CreateForumContainer
);
