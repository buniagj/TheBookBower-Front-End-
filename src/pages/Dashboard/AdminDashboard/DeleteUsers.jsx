import React from 'react';

export default function DeleteUser({ user, onDelete }) {
  const handleDelete = () => {
    if (window.confirm(`Are you sure you want to delete ${user.name}?`)) {
      fetch(`/api/users/${user.id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
      })
        .then(response => response.json())
        .then(data => {
          onDelete(user.id);
        })
        .catch(error => {
          console.error('Error deleting user:', error);
        });
    }
  };

  return (
    <button onClick={handleDelete}>Delete</button>
  );
}
