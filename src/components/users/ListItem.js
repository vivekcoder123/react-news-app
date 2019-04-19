import React, { Component } from 'react';
import { graphql, compose } from 'react-apollo';
import { allUsersQuery, deleteUserQuery, likeUserQuery } from '../../queries/users';

class ListItem extends Component {

  handleDeleteUser = (e) => {
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
        success: 'The user was liked!'
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

  render() {
    const user = this.props.user;
    return (
      <tr>
        <td><button onClick={this.handleEditUser} className="btn btn-primary">Edit</button></td>
        <td><button onClick={this.handleDeleteUser} className="btn btn-danger">X</button></td>
        <td>{user.title}</td>
        <td>{user.description}</td>
        <td>{user.likes}</td>
        <td><button onClick={this.handlelikeUser} className="btn btn-success">Like</button></td>
      </tr>
    );
  }
}

export default compose(
  graphql(deleteUserQuery, { name: 'deleteUser' }),
  graphql(likeUserQuery, { name: 'likeUser' })
)(ListItem);
