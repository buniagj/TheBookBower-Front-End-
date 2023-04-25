import { useState } from "react";

export default function EditBookForm({ book, onEdit }) {
  const [title, setTitle] = useState(book.title);
  const [author, setAuthor] = useState(book.author);
  const [status, setStatus] = useState(book.status);

  function handleSubmit(e) {
    e.preventDefault();
    const updatedBook = { ...book, title, author, status };
    onEdit(updatedBook);
  }

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Title:
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </label>
      <br />
      <label>
        Author:
        <input
          type="text"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
        />
      </label>
      <br />
      <label>
        Status:
        <select value={status} onChange={(e) => setStatus(e.target.value)}>
          <option value="available">Available</option>
          <option value="borrowed">Borrowed</option>
        </select>
      </label>
      <br />
      <button type="submit">Save</button>
    </form>
  );
}
