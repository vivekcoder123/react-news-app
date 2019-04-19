import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import { updateUserQuery } from '../../queries/users';
import Form from './Form';

class Edit extends Component {

  state = {
    alert: ''
  }

  handleSubmit = (values) => {
    const { title, description, url } = values;
    const { user, mutate, alert, close } = this.props;
    mutate({
      variables: {
        id: user.id,
        title,
        description,
        url
      }
    })
    .then((res) => {
      alert({
        success: ' Feed was updated!'
      });
      close();
    }).catch((error) => {
      this.setState({
        alert: {
          type: 'danger',
          message: error.message
        }
      });
    });
  };

  render() {

    return (
      <Form
        modalId="editUserModal"
        title="Edit Feed"
        handleSubmit={this.handleSubmit}
        user={this.props.user}
        close={this.props.close}
        alert={this.state.alert} />
    );
  }
}

export default graphql(updateUserQuery)(Edit);
