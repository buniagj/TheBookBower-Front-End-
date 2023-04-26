import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function ReturnBook() {
  const [bookId, setBookId] = useState('');
  const [returnedDate, setReturnedDate] = useState('');

  const handleFormSubmit = (e) => {
    e.preventDefault();

    // send a POST request to the server to return the book
    axios.post('http://your-api-url/api/return-book', {
      bookId,
      returnedDate
    }, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })
    .then(response => {
      // handle response from server
      console.log(response.data);
      toast.success(response.data.message);
    })
    .catch(error => {
      console.error(error);
      toast.error(error.response.data.message);
    });
  }

  return (
    <div>
      <h1>Return a Book</h1>
      <form onSubmit={handleFormSubmit}>
        <div>
          <label htmlFor="bookId">Book ID:</label>
          <input type="text" id="bookId" name="bookId" value={bookId} onChange={(e) => setBookId(e.target.value)} />
        </div>
        <div>
          <label htmlFor="returnedDate">Returned Date:</label>
          <input type="date" id="returnedDate" name="returnedDate" value={returnedDate} onChange={(e) => setReturnedDate(e.target.value)} />
        </div>
        <button type="submit">Return Book</button>
      </form>
    </div>
  );
}

export default ReturnBook;
