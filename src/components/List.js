import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { fetchPagination } from '../actions';

import Pagination from './Pagination';


class List extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false
    }
  }

  handleLoading = (boolean) => {
    this.setState({ loading: boolean });
  }

  renderData = () => (
    <div className="container">
      <span className="badge badge-light">Total drafts: {this.props.stories.meta.pagination.total}</span>
      <span className="badge badge-light ml-2">Page: {this.props.stories.meta.pagination.current_page} of {this.props.stories.meta.pagination.total_pages}</span>
      <div className="row">
      {this.props.stories.data.map(story => (
        <div key={story.id} className="col-sm-3">
          <Link to={`/draft/${story.id}/${story.title}`}>
            <div className="card mt-4 justify-content-center align-self-center text-center">
              <div className="card-block">
                <p className="card-text">{this.trimTitle(story.title)}</p>
              </div>
            </div>
          </Link>
        </div>
      ))}
        <Pagination 
          loading={this.state.loading}
          handleLoading={this.handleLoading}
          fetchPagination={this.props.fetchPagination} 
          currentPage={this.props.stories.meta.pagination.current_page} 
          totalPages={this.props.stories.meta.pagination.total_pages} />
      </div>
    </div>
  )

  trimTitle(title) {
    if (title.length > 30) {
      return title.substring(0, 30) + '...';
    }
    return title;
  }

  render() {
    console.log(this.props.stories); // {data: Array(10), meta: {…}}

    return (
      <div>
        {
          this.props.stories.data ? 
            this.renderData()
          :
            null
        }
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { stories: state.data };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ fetchPagination }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(List);