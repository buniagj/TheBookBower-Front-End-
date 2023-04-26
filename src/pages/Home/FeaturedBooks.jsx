import React, { useState, useEffect } from 'react';

function FeaturedBooks() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    fetch('https://your-api-endpoint.com/books/featured?month=april')
      .then(response => response.json())
      .then(data => setBooks(data))
      .catch(error => console.log(error));
  }, []);

  return (
    <div>
      <h2>Featured Books for April</h2>
      {books.map(book => (
        <div key={book.id}>
          <h3>{book.title}</h3>
          <p>{book.author}</p>
          <p>{book.description}</p>
        </div>
      ))}
    </div>
  );
}

export default FeaturedBooks;
