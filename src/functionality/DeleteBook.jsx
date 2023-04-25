export default function Book({ book, onDelete }) {
    return (
      <div>
        <span>{book.title}</span>
        <span>{book.author}</span>
        <span>{book.status}</span>
        <button onClick={() => onDelete(book)}>Delete</button>
      </div>
    );
  }
  