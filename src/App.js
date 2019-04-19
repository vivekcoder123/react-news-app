import React, { Component } from 'react';
import UsersCount from './components/users/Count';
import UsersAdd from './components/users/Add';
import UsersEdit from './components/users/Edit';
import UsersList from './components/users/List';
import Alert from './Alert';

class App extends Component {

  state = {
    addUser: null,
    editUser: null,
    alert: ''
  }

  addUser = () => {
    this.setState({
      addUser: {
        title: '',
        description: '',
        url:''
      }
    });
  }

  editUser = (user) => {
    this.setState({
      editUser: user
    });
  }

  close = () => {
    this.setState({
      addUser: null,
      editUser: null
    });
  }

  alert = (msg) => {
    this.setState({
      alert: {
        type: Object.keys(msg)[0],
        message: Object.values(msg)[0]
      }
    });
  }

  render() {
    return (
      <div className="container" style={{marginTop:"24px"}}>
          <h1 class="ui center aligned icon header">
            <i class="circular newspaper icon"></i>
            LearnCool News
          </h1>
       
        <Alert alert={this.state.alert} />
        <div className="d-flex justify-content-between align-items-center" style={{padding:"0% 10%"}}>
        <button class="ui basic button black active" onClick={this.addUser} style={{margin:"20px"}}><i class="icon user" ></i>Add Post</button>

          <UsersCount />
        </div>
        <UsersList
          editUser={this.editUser}
          alert={this.alert} />
        <UsersAdd
          user={this.state.addUser}
          close={this.close}
          alert={this.alert} />
        <UsersEdit
          user={this.state.editUser}
          close={this.close}
          alert={this.alert} />
      </div>
    );
  }
}

export default App;
