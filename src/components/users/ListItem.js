import React, { Component } from 'react';
import { graphql, compose } from 'react-apollo';
import { allUsersQuery, deleteUserQuery, likeUserQuery } from '../../queries/users';
import $ from 'jquery';
import 'bootstrap';


class ListItem extends Component {

  state={
  loading:false
  };

  handleDeleteUser = (e) => {
    this.setState({loading:true});
    $(".testing").modal("hide");
    const { deleteUser, user, alert } = this.props;
    deleteUser({
      variables: {
        id: user.id,
      },
      refetchQueries: [ { query: allUsersQuery }]
    })
    .then((res) => {
      alert({
        success: 'Feed has been deleted successfully!'
      });
      this.setState({loading:false});
    }).catch((error) => {
      alert({
        danger: error.message
      });
    });
  }

  handlelikeUser = (e) => {
    this.setState({loading:true});
    const { likeUser, user, alert } = this.props;
    likeUser({
      variables: {
        id: user.id,
        likes: user.likes + 1
      },
      optimisticResponse: {
        __typename: 'Mutation',
        updateUser: {
          __typename: 'User',
          id: user.id,
          likes: user.likes + 1,
        },
      },
      refetchQueries: [ { query: allUsersQuery }]
    })
    .then((res) => {
      alert({
        success: 'Feed has been liked successfully!'
      });
      this.setState({loading:false});
    }).catch((error) => {
      alert({
        danger: error.message
      });
    });
  }

  handleEditUser = () => {
    this.props.editUser(this.props.user);
  }
  
  render() {
    if(this.state.loading){
      return (<div class="ui">
      <div class="ui active inverted dimmer">
        <div class="ui text loader">Please wait.....</div>
      </div>
      </div>);
    }else{
    const user = this.props.user;
    return (
      <div class="ui card" style={{width:"100%"}}>
  <div class="content">
    <i title="Edit Post" style={{cursor:"pointer",fontSize:"24px",color:"#39b"}} class="right floated edit icon" onClick={this.handleEditUser}></i>
    <i title="Delete Post" style={{cursor:"pointer",fontSize:"24px",color:"#f65d3c"}} 
    class="right floated trash icon" 
    data-toggle="modal" data-target={`#myModal${user.id}`}></i>
    <img class="ui avatar image" src="https://semantic-ui.com/images/avatar/large/elliot.jpg"/><strong>{user.title}</strong>
    
    <div class="description">
      <p>{user.description}</p>
      <h4 style={{margin:"0px"}}>Post Url:<a target="_blank" href={user.url}>{user.url}</a></h4>
    </div>
  </div>
  <div class="extra content">
    <span class="left floated like" onClick={this.handlelikeUser} style={{cursor:"pointer"}}>
      {user.likes>0?user.likes:0}
      <i class="like icon" style={{marginLeft:"4px"}}></i>
      Upvote
    </span>
  </div>
  <div id={`myModal${user.id}`} class="modal fade testing" role="dialog">
  <div class="modal-dialog">

    <div class="modal-content" style={{padding:"20px"}}>
      <div className="modal-body text-center">
        <h3>Are you sure, you want to delete this feed !</h3>
      </div>
      <div className="text-center">
        <div className="row">
        <div className="col-6">
        <button className="btn btn-warning btn-block" data-dismiss="modal">No</button>
        </div>
        <div className="col-6">
        <button className="btn btn-danger btn-block" onClick={this.handleDeleteUser}>Yes</button>
        </div>
        </div>
      </div>
    </div>

  </div>
</div>


</div>
    );
    }
  }
}

export default compose(
  graphql(deleteUserQuery, { name: 'deleteUser' }),
  graphql(likeUserQuery, { name: 'likeUser' })
)(ListItem);
