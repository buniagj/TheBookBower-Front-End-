import React, { useState } from 'react';

export default function AddBookForm({ onSubmit }) {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [isbn, setIsbn] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const newBook = {
      title,
      author,
      isbn,
      description,
    };
    onSubmit(newBook);
    setTitle('');
    setAuthor('');
    setIsbn('');
    setDescription('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="title">Title:</label>
        <input type="text" id="title" value={title} onChange={(e) => setTitle(e.target.value)} />
      </div>
      <div>
        <label htmlFor="author">Author:</label>
        <input type="text" id="author" value={author} onChange={(e) => setAuthor(e.target.value)} />
      </div>
      <div>
        <label htmlFor="isbn">ISBN:</label>
        <input type="text" id="isbn" value={isbn} onChange={(e) => setIsbn(e.target.value)} />
      </div>
      <div>
        <label htmlFor="description">Description:</label>
        <textarea id="description" value={description} onChange={(e) => setDescription(e.target.value)}></textarea>
      </div>
      <button type="submit">Add Book</button>
    </form>
  );
}
