import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { postDraft } from '../actions';
import NotificationBtn from './Notifications';


class Form extends Component {
  state = {
    title: '',
    body: '',
    form: 'warning'
  }

  handleChange = name => async e => {
    await this.setState({ [name]: e.target.value });
    if (this.state.title === '' || this.state.body === '') {
      this.setState({ form: 'warning' });
    } else if (this.state.title !== '' && this.state.body !== '') {
      this.setState({ form: 'success' });
    }
  };

  handleSubmit = async e => {
    e.preventDefault();
    if (this.state.title !== '' && this.state.body !== '') {
      await this.setState({ form: 'success' });
      this.props.postDraft(this.state.title, this.state.body);
      this.setState({ 
        title: '',
        body: ''
     });
    } else {
      return;
    }
  };
  
  render() {    
    return (
      <div className="container">
        <div className="row">
          <div className="col-sm-10 offset-sm-1 text-center">
            <form onSubmit={this.handleSubmit}>
            <div className="form-group">
              <input type="text" className="form-control" placeholder="Title" required
                onChange={this.handleChange('title')} 
                value={this.state.title}
              />
            </div>
            <div className="form-group">
              <textarea className="form-control" rows="16" placeholder="Write your story..." required
                onChange={this.handleChange('body')} 
                value={this.state.body} 
              />
            </div>
              <NotificationBtn formState={this.state.form} />
            </form>
          </div>
        </div>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ postDraft }, dispatch)
}

export default connect(null, mapDispatchToProps)(Form);