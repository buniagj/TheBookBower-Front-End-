import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Sort from './Sort';
import FilterUsers from './FilterUsers';
import Pagination from './Pagination';
import EditUsers from './EditUsers';
import AddUsers from './AddUsers';
import DeleteUsers from './DeleteUsers';
import ExportToExcel from './ExportToExcel';

export default function UserList() {
  const [users, setUsers] = useState([]);
  const [sortType, setSortType] = useState('asc');
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(5);
  const [editing, setEditing] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const [showAddUserForm, setShowAddUserForm] = useState(false);
  const [showEditUserForm, setShowEditUserForm] = useState(false);
  const [showDeleteUserForm, setShowDeleteUserForm] = useState(false);

  useEffect(() => {
    axios.get('/api/users')
      .then(response => {
        setUsers(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  const sortUsers = (type) => {
    setSortType(type);
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handlePagination = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);

  const filteredUsers = currentUsers.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortedUsers = filteredUsers.sort((a, b) => {
    const isReversed = (sortType === 'asc') ? 1 : -1;
    return isReversed * a.name.localeCompare(b.name);
  });

  const editUser = (user) => {
    setEditing(true);
    setCurrentUser(user);
    setShowEditUserForm(true);
  };

  const addUser = () => {
    setShowAddUserForm(true);
  };

  const deleteUser = (user) => {
    setCurrentUser(user);
    setShowDeleteUserForm(true);
  };

  const closeAddUserForm = () => {
    setShowAddUserForm(false);
  };

  const closeEditUserForm = () => {
    setEditing(false);
    setShowEditUserForm(false);
  };

  const closeDeleteUserForm = () => {
    setShowDeleteUserForm(false);
  };

  const renderUserTable = () => {
    return (
      <table>
        <thead>
          <tr>
            <th>Name <Sort sortType={sortType} onSort={sortUsers} /></th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {sortedUsers.map(user => (
            <tr key={user.id}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>
                <button onClick={() => editUser(user)}>Edit</button>
                <button onClick={() => deleteUser(user)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  };

  return (
    <div>
      <h2>Users</h2>
      <FilterUsers searchTerm={searchTerm} onSearch={handleSearch} />
      <button onClick={addUser}>Add User</button>
      <ExportToExcel users={users} />
      {renderUserTable()}
      <Pagination
     usersPerPage={usersPerPage}
     totalUsers={users.length}
     currentPage={currentPage}
     onPageChange={handlePagination}
      />
      {showAddUserForm && <AddUsers onClose={closeAddUserForm} />}
      {showEditUserForm && <EditUsers user={currentUser} onClose={closeEditUserForm} />}
      {editing && <EditUsers user={currentUser} onClose={closeEditUserForm} />}
      {showDeleteUserForm && <DeleteUsers user={currentUser} onClose={closeDeleteUserForm} />}
    </div>
  );
}
