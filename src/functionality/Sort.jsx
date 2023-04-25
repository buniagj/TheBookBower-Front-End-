export default function sortBooks(books, sortField, sortOrder) {
    // Make a copy of the books array
    const sortedBooks = [...books];
  
    // Sort the books based on the sortField and sortOrder
    sortedBooks.sort((a, b) => {
      if (sortOrder === 'asc') {
        if (a[sortField] < b[sortField]) {
          return -1;
        }
        if (a[sortField] > b[sortField]) {
          return 1;
        }
        return 0;
      } else {
        if (a[sortField] < b[sortField]) {
          return 1;
        }
        if (a[sortField] > b[sortField]) {
          return -1;
        }
        return 0;
      }
    });
  
    return sortedBooks;
  }
  