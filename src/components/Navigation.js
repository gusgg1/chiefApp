import React from 'react';
import { Link } from 'react-router-dom';


export default (props) => (
  <nav className='navbar navbar-dark bg-primary fixed-top'>
    <Link className="navbar-brand" to="/">
      MyStory App
    </Link>
    <div>
      {props.children}
    </div>
      {props.children ? null : <Link className="btn btn-warning" to="/">Cancel</Link>}
  </nav>
);
