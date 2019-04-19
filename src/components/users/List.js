import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import { allUsersQuery, likedUserQuery } from '../../queries/users';
import ListItem from './ListItem.js'

class List extends Component {

  componentWillMount() {
    this.props.data.subscribeToMore({
      document: likedUserQuery,
      updateQuery: (prev, {subscriptionData}) => {
        return prev;
      }
    });
  }

  render() {
    const {loading, error, allPosts} = this.props.data;
    if (loading) {
      return (<div class="ui">
      <div class="ui active inverted dimmer">
        <div class="ui text loader">Fetching Feeds</div>
      </div>
      </div>);
    }
    if (error) {
      return <div>${error}</div>;
    }
    return (
      <div style={{padding:"0% 10%"}}>
          { allPosts.map(user => <ListItem
            key={user.id}
            user={user}
            editUser={this.props.editUser}
            alert={this.props.alert}/>) }

      </div>
    );
  }
}

export default graphql(allUsersQuery)(List);
