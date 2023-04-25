export default function Book({ book, onChangeStatus }) {
    function handleClick() {
      onChangeStatus(book);
    }
  
    return (
      <div>
        <span>{book.title}</span>
        <span>{book.author}</span>
        <span>{book.status}</span>
        <button onClick={handleClick}>Change Status</button>
      </div>
    );
  }
  