import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import { allUsersQuery, createUserQuery } from '../../queries/users';
import Form from './Form';
import $ from 'jquery';

class Add extends Component {

  state = {
    alert: '',
    loading:false
  }

  handleSubmit = (values) => {
    this.setState({loading:true});
    const { title, description, url } = values;
    const likes=0;
    const { mutate, alert, close } = this.props;
    mutate({
      variables: {title, description, url, likes },
      refetchQueries: [ { query: allUsersQuery }]
    })
    .then((res) => {
      alert({
        success: 'New Feed has been created successfully!'
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
  }

  render() {

    if(this.state.loading){
      return (<div class="ui">
      <div class="ui active inverted dimmer">
        <div class="ui text loader">Creating News Feed.....</div>
      </div>
      </div>);
    }else{
    return (
      <Form
        modalId="addUserModal"
        title="Create New Feed"
        handleSubmit={this.handleSubmit}
        user={this.props.user}
        close={this.props.close}
        alert={this.state.alert} />
    );
    }
  }
}

export default graphql(createUserQuery)(Add);
