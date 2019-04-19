import React, { Component } from 'react';
import Alert from '../../Alert';
import $ from 'jquery';
import 'bootstrap';

class UserForm extends Component {

  state = {
    title: '',
    description: '',
    url: ''
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.user && !this.props.user) {
      const { title, description, url } = nextProps.user;
      this.setState({ title, description, url });
    }
  }

  componentDidUpdate() {
    if (this.props.user) {
      $(`#${this.props.modalId}`).modal('show');
    } else {
      $(`#${this.props.modalId}`).modal('hide');
    }
  }

  handleSubmit = (e) => {
    const { title, description, url } = this.state;
    e.preventDefault();
    this.props.handleSubmit({ title, description, url });
  }

  render() {
    const { close, modalId, alert } = this.props;
    const head=this.props.title;
    return (
      <div className="modal fade in" id={modalId} tabIndex="-1" role="dialog">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <form onSubmit={this.handleSubmit}>
              <div className="modal-header">
                <h5 className="modal-title">{head}</h5>
                <button type="button" className="close" onClick={close}>
                  <span>&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <Alert alert={alert} />
                <div className="form-row">
                  <div className="col">
                    <input
                      type="text"
                      value={this.state.title}
                      placeholder="Name"
                      onChange={(e)=>this.setState({title:e.target.value})}
                      className="form-control" />
                  </div>
                  <div className="col">
                    <input
                      type="text"
                      value={this.state.description}
                      placeholder="Email"
                      className="form-control"
                      onChange={(e)=>this.setState({description:e.target.value})} />
                  </div>
                  <div className="col">
                    <input
                      type="text"
                      value={this.state.url}
                      placeholder="Url"
                      className="form-control"
                      onChange={(e)=>this.setState({url:e.target.value})} />
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-dismiss="modal"
                  onClick={close}>Close</button>
                <input
                  type="submit"
                  name="Save changes"
                  placeholder="New user"
                  className="btn btn-primary" />
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default UserForm;
