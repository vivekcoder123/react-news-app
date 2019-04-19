import React, { Component } from 'react';
import { graphql, compose } from 'react-apollo';
import { allUsersQuery, deleteUserQuery, likeUserQuery } from '../../queries/users';
import $ from 'jquery';
import 'bootstrap';


class ListItem extends Component {

  handleDeleteUser = (e) => {
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
        success: 'The user was deleted!'
      });
    }).catch((error) => {
      alert({
        danger: error.message
      });
    });
  }

  handlelikeUser = (e) => {
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
        success: 'Your Post  ❤️️ Liked!'
      });
    }).catch((error) => {
      alert({
        danger: error.message
      });
    });
  }

  handleEditUser = () => {
    this.props.editUser(this.props.user);
  }
  mymodal = () =>{
    <div class="modal-content">
			<div class="modal-header">
				<div class="icon-box">
					<i class="material-icons"></i>
				</div>				
				<h4 class="modal-title">Are you sure?</h4>	
                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
			</div>
			<div class="modal-body">
				<p>Do you really want to delete these records? This process cannot be undone.</p>
			</div>
			<div class="modal-footer">
				<button type="button" class="btn btn-info" data-dismiss="modal">Cancel</button>
				<button type="button" class="btn btn-danger">Delete</button>
			</div>
		</div>
  }

  render() {
    const user = this.props.user;
    return (
      <div class="ui card" style={{width:"100%"}}>
  <div class="content">
    <i title="Edit Post" style={{cursor:"pointer",fontSize:"24px",color:"#39b"}} class="right floated edit icon" onClick={this.handleEditUser}></i>
    <i title="Delete Post" style={{cursor:"pointer",fontSize:"24px",color:"#f65d3c"}} 
    class="right floated trash icon" 
    data-toggle="modal" data-target={`#myModal${user.id}`}></i>
    <img class="ui avatar image" src="https://semantic-ui.com/images/avatar/large/elliot.jpg"/  > <strong>{user.title}</strong>
    
    <div class="description">
      <p>{user.description}</p>
      <h4 style={{margin:"0px"}}>Post Url:<a target="_blank" href={user.url}>{user.url}</a></h4>
    </div>
  </div>
  <div class="extra content">
    <span class="left floated like">
      {user.likes>0?user.likes:0}
      <i class="like icon" style={{marginLeft:"4px"}} onClick={this.handlelikeUser}></i>
      Upvote
    </span>
  </div>
  <div id={`myModal${user.id}`} class="modal fade testing" role="dialog">
  <div class="modal-dialog">

    <div class="modal-content">
      <div class="modal-body">
        <p>Are you sure, you want to delete this feed !</p>
      </div>
      <div>
        <button className="btn btn-light" data-dismiss="modal">No</button>
        <button className="btn btn-danger" onClick={this.handleDeleteUser}>Yes</button>
      </div>
    </div>

  </div>
</div>


</div>
    );
  }
}

export default compose(
  graphql(deleteUserQuery, { name: 'deleteUser' }),
  graphql(likeUserQuery, { name: 'likeUser' })
)(ListItem);
