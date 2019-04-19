import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import { updateUserQuery } from '../../queries/users';
import Form from './Form';
import $ from 'jquery';

class Edit extends Component {

  state = {
    alert: '',
    loading:false
  }


  handleSubmit = (values) => {
    this.setState({loading:true});
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
        success: 'Feed has been updated successfully!'
      });
      close();
      $('body').removeClass('modal-open');
      $('.modal-backdrop').remove();
      this.setState({loading:false});  
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
    if(this.state.loading){
      return (<div class="ui">
      <div class="ui active inverted dimmer">
        <div class="ui text loader">Editing In Progress.....</div>
      </div>
      </div>);
    }
    else{
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
}

export default graphql(updateUserQuery)(Edit);
