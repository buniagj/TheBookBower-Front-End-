import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { AiOutlineEdit, AiOutlineDelete } from 'react-icons/ai';
import Sort from './Sort';
import FilterUsers from './FilterUsers';
import Pagination from './Pagination';
import EditUsers from './EditUsers';
import AddUserForm from './AddUsers';
import DeleteUsers from './DeleteUsers';
import ExportToExcel from './ExportToExcel';
import http from '../../../lib/https';
import { useParams, useNavigate } from "react-router-dom";
import styled from 'styled-components';

const Table = styled.table`
  border-collapse: collapse;
  width: 90%;
  margin-left: 5rem;
  margin-right: 5rem;
`;

const Th = styled.th`
  background-color: #ddd;
  border: 1px solid #ddd;
  padding: 8px;
  text-align: left;
`;

const Td = styled.td`
  border: 1px solid #ddd;
  padding: 5px;
`;

const ActionsTd = styled(Td)`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
`;

const Button = styled.button`
  background-color: #4CAF50;
  border: none;
  color: white;
  padding: 8px 16px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin: 1rem 2rem;
  cursor: pointer;
`;

const Icon = styled.span`
  display: inline-block;
  margin-right: 5px;
`;
export default function UserList() {
  const { id } = useParams();
  const [users, setUsers] = useState([]);
  const [sortType, setSortType] = useState('asc');
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(0);
  const [usersPerPage] = useState(10);
  const [editing, setEditing] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const [showAddUserForm, setShowAddUserForm] = useState(false);
  const [showEditUserForm, setShowEditUserForm] = useState(false);
  const [showDeleteUserForm, setShowDeleteUserForm] = useState(false);
  const [meta, setMeta] = useState({});

  async function getUsers(page = 1) {
    const url = `/users?page=${page}`
    const res = await http.get(url, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`
      }
    })
    console.log(res.data.meta)
    setUsers(res.data.data)
    setMeta(res.data.meta)
  }

  useEffect(() => {
    getUsers()
    return
  }, [])


  const sortUsers = (type) => {
    setSortType(type);
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredUsers = users
    .filter(user => {
      return user.name.toLowerCase().includes(searchTerm.toLowerCase());
    });

  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);

  const indexOfLastUser = (currentPage + 1) * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);

  const paginatedUsers = currentUsers.sort((a, b) => {
    const isReversed = (sortType === 'asc') ? 1 : -1;
    return isReversed * a.name.localeCompare(b.name);
  });

  const handleEdit = (user) => {
    setEditing(true);
    setCurrentUser(user);
  }

  const handleDelete = (user) => {
    setCurrentUser(user);
    setShowDeleteUserForm(true);
  }

  return (
    <>
      {showAddUserForm && (
        <AddUsers
          setShowAddUserForm={setShowAddUserForm}
          getUsers={getUsers}
        />
      )}
      {showEditUserForm && (
        <EditUsers
          currentUser={currentUser}
          setShowEditUserForm={setShowEditUserForm}
          getUsers={getUsers}
        />
      )}
      {showDeleteUserForm && (
        <DeleteUsers
          currentUser={currentUser}
          setShow_DeleteUserForm={setShowDeleteUserForm}
          getUsers={getUsers}
        />
      )}
      <div>
        <h1>User List</h1>
        <div className="flex items-center">
          <input
            type="text"
            placeholder="Search users..."
            className="border rounded-md px-2 py-1 mr-2"
            value={searchTerm}
            onChange={handleSearch}
          />
          <Button
            className="btn btn-primary" 
            onClick={() => setShowAddUserForm(true)}
          >
            Add User
          </Button>
          <Button
            className="btn btn-primary"
            onClick={() => sortUsers(sortType === 'asc' ? 'desc' : 'asc')}
          >
            Sort {sortType === 'asc' ? 'Z-A' : 'A-Z'}
          </Button>
        </div>
      </div>
      <Table >
        <thead>
          <tr>
             <Th>Name</Th>
             <Th>Role</Th>
            <Th>Email</Th>
            <Th>Phone Number</Th>
            <Th>Address</Th>
            <Th>Actions</Th>
          </tr>
        </thead>
        <tbody>
          {paginatedUsers.map((user) => (
            <tr key={user.id}>
              <Td >{user.name}</Td>
              <Td >{user.role_name}</Td>
              <Td >{user.email}</Td>
              <Td>{user.phone_number}</Td>
              <Td>{user.address}</Td>
               <ActionsTd>
                <Link to={`/users/${user.id}`}>
                  <Icon>
                    <AiOutlineEdit />
                  </Icon>
                  </Link>
                   <Link to={`/users/${user.id}`}>
                <Icon onClick={() => handleDelete(user)}>
                  <AiOutlineDelete />
                    </Icon>
                    </Link>
              </ActionsTd>
            </tr>
          ))}
        </tbody>
      </Table>
      <Pagination
        totalPages={totalPages}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
    </>
  );
}
