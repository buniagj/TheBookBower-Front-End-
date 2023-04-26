import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Borrow() {
  const [bookId, setBookId] = useState('');
  const [borrowerName, setBorrowerName] = useState('');
  const [borrowedDate, setBorrowedDate] = useState('');

  const handleFormSubmit = (e) => {
    e.preventDefault();

    // send a POST request to the server to borrow the book
    axios.post('/api/borrow-book', {
      bookId,
      borrowerName,
      borrowedDate
    })
    .then(response => {
      // handle response from server
      console.log(response.data);

      // show success message using react toastify
      toast.success('Book borrowed successfully');
    })
    .catch(error => {
      console.error(error);

      // show error message using react toastify
      toast.error('Error borrowing book');
    });
  }

  return (
    <div>
      <h1>Borrow a Book</h1>
      <form onSubmit={handleFormSubmit}>
        <div>
          <label htmlFor="bookId">Book ID:</label>
          <input type="text" id="bookId" name="bookId" value={bookId} onChange={(e) => setBookId(e.target.value)} />
        </div>
        <div>
          <label htmlFor="borrowerName">Borrower Name:</label>
          <input type="text" id="borrowerName" name="borrowerName" value={borrowerName} onChange={(e) => setBorrowerName(e.target.value)} />
        </div>
        <div>
          <label htmlFor="borrowedDate">Borrowed Date:</label>
          <input type="date" id="borrowedDate" name="borrowedDate" value={borrowedDate} onChange={(e) => setBorrowedDate(e.target.value)} />
        </div>
        <button type="submit">Borrow Book</button>
      </form>
    </div>
  );
}

export default Borrow;
