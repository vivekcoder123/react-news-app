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
                <div className="row">
                <div className="col-6">
                <img src="index.jpeg" className="img-fluid" style={{position:"relative",bottom:"24px"}}/>
                </div>
                <div className="col-6">
                <div className="form-group">
                    <input
                      type="text"
                      value={this.state.title}
                      placeholder="Title"
                      onChange={(e)=>this.setState({title:e.target.value})}
                      className="form-control"
                      required />
                  </div>
                  <div className="form-group">
                    <textarea
                      value={this.state.description}
                      placeholder="Description"
                      className="form-control"
                      onChange={(e)=>this.setState({description:e.target.value})}
                      required rows="2" cols="10">
                      </textarea>
                  </div>
                  <div className="form-group">
                    <input
                      type="url"
                      value={this.state.url}
                      placeholder="Enter absolute url"
                      className="form-control"
                      onChange={(e)=>this.setState({url:e.target.value})}
                      required
                      title="Url should start with http:// or https://"
                     />
                  </div>
                  <div className="form-group">
                    <input
                      type="submit"
                      className="btn btn-dark"
                      value={head} />
                  </div>
                  
                </div>
                  
                </div>
              </div>
              
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default UserForm;
