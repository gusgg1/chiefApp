import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { updateDraft } from '../actions';


class ListItem extends Component {
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
    return (
      <div className="container">
        <div className="row">
          <div className="col-sm-10 offset-sm-1 text-center">
            <form onSubmit={this.handleSubmit}>
            <div className="form-group">
              <input type="text" className="form-control" 
                defaultValue={this.props.match.match.params.title ? this.props.match.match.params.title : null} 
                onChange={this.handleChange('title')} 
                required
              />
            </div>
            <div className="form-group">
              <textarea className="form-control" rows="16" placeholder="Write your story..."
                onChange={this.handleChange('body')} 
                value={this.state.body}
              />
            </div>
              <button className="btn btn-success btn-md"
                onClick={() => this.props.updateDraft(this.props.match.match.params.id, this.state.title, this.state.body)}
              >
              Update Draft
              </button> 
            </form>
          </div>
        </div>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ updateDraft }, dispatch)
}

export default connect(null, mapDispatchToProps)(ListItem);
