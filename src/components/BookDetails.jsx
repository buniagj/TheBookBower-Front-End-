import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'; // Assumes you're using React Router

function BookDetails() {
  const { id } = useParams(); // Assumes the book ID is passed as a URL parameter
  const [book, setBook] = useState(null);

  useEffect(() => {
    async function fetchBook() {
      try {
        const response = await fetch(`/api/books/${id}`); // Replace with your Laravel API endpoint
        const data = await response.json();
        setBook(data);
      } catch (error) {
        console.error(error);
      }
    }

    fetchBook();
  }, [id]);

  if (!book) {
    return <div>Loading...</div>; // Render a loading indicator while fetching book data
  }

  return (
    <div>
      <h2>{book.title}</h2>
      <p>Author: {book.author}</p>
      <p>Year: {book.year}</p>
      <p>Description: {book.description}</p>
      <p>ISBN: {book.isbn}</p>
    </div>
  );
}

export default BookDetails;
