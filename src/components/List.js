import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { fetchPagination } from '../actions';

import Pagination from './Pagination';


class List extends Component {

  renderData = () => (
    <div className="container">
      <div className="row">
      {this.props.stories.data.map(story => (
        <div key={story.id} className="col-sm-3">
          <Link to={`/draft/${story.id}/${story.title}`}>
            <div className="card mt-4 justify-content-center align-self-center text-center">
              <div className="card-block">
                <p className="card-text">{this.trimSlug(story.slug)}</p>
              </div>
            </div>
          </Link>
        </div>
      ))}
        <Pagination 
          fetchPagination={this.props.fetchPagination} 
          currentPage={this.props.stories.meta.pagination.current_page} 
          totalPages={this.props.stories.meta.pagination.total_pages} />
      </div>
    </div>
  )

  trimSlug(slug) {
    if (slug.length > 30) {
      return slug.substring(0, 30) + '...';
    }
    return slug;
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