import React from 'react';
import { NavLink } from 'react-router-dom';
import '../assets/stylesheets/Search.css';

// type paginationProps = {
//     moviesPerPage:number;
//     totalMovies:number;
//     paginate:any;
//   };
const Pagination = ({ moviesPerPage, totalMovies, paginate }: any) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalMovies / moviesPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav className='main-pagination'>
      <ul className='pagination'>
        {pageNumbers.map((number) => (
          <li key={number} className='page-item'>
            <NavLink
              onClick={() => paginate(number)}
              to=''
              className='page-link'
            >
              {number}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Pagination;
