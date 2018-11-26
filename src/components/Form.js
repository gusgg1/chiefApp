import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { postDraft } from '../actions';


class Form extends Component {
  state = {
    title: '',
    body: ''
  }

  handleChange = name => e => {
    this.setState({ [name]: e.target.value });
  };

  handleSubmit = e => {
    e.preventDefault();    
    this.setState({ 
      title: '',
      body: ''
   });
  };
  
  render() {
    console.log(this.props.match);
    
    return (
      <div className="container">
        <div className="row">
          <div className="col-sm-10 offset-sm-1 text-center">
            <form onSubmit={this.handleSubmit}>
            <div className="form-group">
              <input type="text" className="form-control" placeholder="Title" 
                onChange={this.handleChange('title')} 
                value={this.state.title}
                required
              />
            </div>
            <div className="form-group">
              <textarea onChange={this.handleChange('body')} value={this.state.body} className="form-control" rows="16" placeholder="Write your story..." required></textarea>
            </div>
              <button onClick={() => this.props.postDraft(this.state.title, this.state.body)} className="btn btn-success btn-md">Create Draft</button> 
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