import React, { useState } from 'react';
import ReactPaginate from 'react-paginate';
import './Admin.css'

function Pagination({ data }) {
  const [currentPage, setCurrentPage] = useState(0);

  // handle page change
  const handlePageChange = (page) => {
    setCurrentPage(page.selected);
  }

  // items per page
  const itemsPerPage = 10;

  // get current page items
  const currentPageItems = data.slice(currentPage * itemsPerPage, currentPage * itemsPerPage + itemsPerPage);

  return (
    <div>
      {currentPageItems.map(item => (
        <div key={item}>{item}</div>
      ))}
      <ReactPaginate
        previousLabel={'previous'}
        nextLabel={'next'}
        breakLabel={'...'}
        breakClassName={'break-me'}
        pageCount={Math.ceil(data.length / itemsPerPage)}
        marginPagesDisplayed={2}
        pageRangeDisplayed={10}
        onPageChange={handlePageChange}
        containerClassName={'pagination'}
        activeClassName={'active'}
      />
    </div>
  );
}

export default Pagination;
