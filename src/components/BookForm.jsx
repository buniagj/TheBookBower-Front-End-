import React from 'react';

export default function BookForm({ book, onSubmit, onCancel }) {
    const [formData, setFormData] = useState({
      title: book.title,
      author: book.author,
      publisher: book.publisher,
      status: book.status,
      borrowedDate: book.borrowedDate,
      returnedDate: book.returnedDate,
    });
  
    const handleChange = (event) => {
      setFormData({ ...formData, [event.target.name]: event.target.value });
    };
  
    const handleSubmit = (event) => {
      event.preventDefault();
      onSubmit(formData);
    };
  
    const handleCancel = () => {
      onCancel();
    };
  
    return (
      <form onSubmit={handleSubmit}>
        <h2>Edit Book</h2>
        <div>
          <label>Title:</label>
          <input type="text" name="title" value={formData.title} onChange={handleChange} />
        </div>
        <div>
          <label>Author:</label>
          <input type="text" name="author" value={formData.author} onChange={handleChange} />
        </div>
        <div>
          <label>Publisher:</label>
          <input type="text" name="publisher" value={formData.publisher} onChange={handleChange} />
        </div>
        <div>
          <label>Status:</label>
          <select name="status" value={formData.status} onChange={handleChange}>
            <option value="borrowed">Borrowed</option>
            <option value="returned">Returned</option>
            <option value="out of stock">Out of Stock</option>
          </select>
        </div>
        <div>
          <label>Borrowed Date:</label>
          <input type="date" name="borrowedDate" value={formData.borrowedDate} onChange={handleChange} />
        </div>
        <div>
          <label>Returned Date:</label>
          <input type="date" name="returnedDate" value={formData.returnedDate} onChange={handleChange} />
        </div>
        <ActionButtons onSubmit={handleSubmit} onCancel={handleCancel} />
      </form>
    );
  }
  