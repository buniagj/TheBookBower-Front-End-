import React, { useState } from 'react';
import ReactPaginate from 'react-paginate';
import './Admin.css'

function Pagination() {
  const [currentPage, setCurrentPage] = useState(0);

  // handle page change
  const handlePageChange = (page) => {
    setCurrentPage(page.selected);
  }

  // sample data
  const data = ['Item 1', 'Item 2', 'Item 3', 'Item 4', 'Item 5', 'Item 6', 'Item 7', 'Item 8', 'Item 9', 'Item 10', 'Item 11', 'Item 12', 'Item 13', 'Item 14', 'Item 15', 'Item 16', 'Item 17', 'Item 18', 'Item 19', 'Item 20', 'Item 21', 'Item 22', 'Item 23', 'Item 24', 'Item 25', 'Item 26', 'Item 27', 'Item 28', 'Item 29', 'Item 30', 'Item 31', 'Item 32', 'Item 33', 'Item 34', 'Item 35', 'Item 36', 'Item 37', 'Item 38', 'Item 39', 'Item 40', 'Item 41', 'Item 42', 'Item 43', 'Item 44', 'Item 45', 'Item 46', 'Item 47', 'Item 48', 'Item 49', 'Item 50'];

  // items per page
  const itemsPerPage = 10;

  // get current page items
  const currentPageItems = data.slice(currentPage * itemsPerPage, currentPage * itemsPerPage + itemsPerPage);

  return (
    <div>
      <ReactPaginate
        previousLabel={'previous'}
        nextLabel={'next'}
        breakLabel={'...'}
        breakClassName={'break-me'}
        pageCount={Math.ceil(data.length / itemsPerPage)}
        marginPagesDisplayed={2}
        pageRangeDisplayed={5}
        onPageChange={handlePageChange}
        containerClassName={'pagination'}
        activeClassName={'active'}
      />
    </div>
  );
}

export default Pagination;
