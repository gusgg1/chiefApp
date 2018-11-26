import React from 'react';
import { Link } from 'react-router-dom';


export default (props) => {

  const nextBtnControls = (page) => {
    if (props.currentPage === props.totalPages) {
      return;
    } 
    return props.fetchPagination(page);
  }

  const previousBtnControls = (page) => {
    if (props.currentPage === 1) {
      return;
    }
    return props.fetchPagination(page);
  }

  return (
    <React.Fragment>
      <div className="col-sm-3">
        <Link onClick={() => previousBtnControls(props.currentPage - 1)} to='/'>
          <div className="card mt-4 justify-content-center align-self-center text-center pagination-previous">
            <div className="card-block">
              <p className="card-text">Previous</p>
            </div>
          </div>
        </Link>
      </div>
      <div className="col-sm-3">
        <Link onClick={() => nextBtnControls(props.currentPage + 1)} to='/'>
          <div className="card mt-4 justify-content-center align-self-center text-center pagination-next">
            <div className="card-block">
              <p className="card-text">Next</p>
            </div>
          </div>
        </Link>
      </div>
    </React.Fragment>
  );
};