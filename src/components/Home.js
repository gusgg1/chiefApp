import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { getData } from '../actions';

import Loading from './Loading';
import List from './List';
import Intro from './Intro';
import Navigation from './Navigation';


class Nav extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false
    };
  }

  getData = async () => {
    this.setState({
      loading: true
    });
    let code;
    if (window.location.href.includes('code')) {
      const codeMatch = window.location.href.match(/code=([^&]*)/);
      code = codeMatch[1];
    }
    await this.props.getData(code);
    if (this.props.stories.data) {
      this.setState({
        loading: false
      });
    }
  }

  renderButton() {
    if (window.location.href.includes('code') || this.props.stories.data) {
      return <React.Fragment>
        <button onClick={this.getData} className="btn btn-secondary my-2 my-sm-0" type="submit">Get Your Drafts</button>
        {this.props.stories.data ? <Link className="btn btn-success ml-3" to="/create">Create Draft</Link> : null}
      </React.Fragment>
    } else {
      return <button onClick={this.props.login} type="button" className="btn btn-md btn-outline-secondary logger">Sign In</button>
    }
  }

  render() {
    return (
      <div>

        <Navigation>
          {this.renderButton()}
        </Navigation>

        {this.state.loading ? <Loading /> : null}

        <List />

        {this.state.loading || this.props.stories.data ? null : <Intro />}

      </div>
    );
  }
}

function mapStateToProps(state) {
  return { stories: state.data };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ getData }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Nav);
