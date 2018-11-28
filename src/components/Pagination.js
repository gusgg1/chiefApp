import React from 'react';
import { Link } from 'react-router-dom';
import PaginationLoading from 'react-loading-animation';


export default (props) => {

  const buttonControls = async (page, pages) => {
    if (props.currentPage === pages) {
      return;
    } 
    props.handleLoading(true);
    await props.fetchPagination(page);
    props.handleLoading(false);
  }

  return (
    <React.Fragment>
      <div className="col-sm-3">
        <Link onClick={() => buttonControls(props.currentPage - 1, 1)} to='/'>
          <div className="card mt-4 justify-content-center align-self-center text-center pagination-previous">
            <div className="card-block">
              <p className="card-text">Previous</p>
            </div>
          </div>
        </Link>
      </div>
      <div className="col-sm-3">
        <Link onClick={() => buttonControls(props.currentPage + 1, props.totalPages)} to='/'>
          <div className="card mt-4 justify-content-center align-self-center text-center pagination-next">
            <div className="card-block">
              <p className="card-text">Next</p>
            </div>
          </div>
        </Link>
      </div>
      {props.loading ? <PaginationLoading /> : null}
    </React.Fragment>
  );
  
};