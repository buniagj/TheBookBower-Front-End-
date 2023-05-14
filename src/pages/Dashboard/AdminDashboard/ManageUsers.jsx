import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { AiOutlineEdit, AiOutlineDelete } from 'react-icons/ai';
import Sort from './Sort';
import FilterUsers from './FilterUsers';
import Pagination from './Pagination';
import EditUsers from './EditUsers';
import AddUsers from './AddUsers';
import DeleteUsers from './DeleteUsers';
import ExportToExcel from './ExportToExcel';
import http from '../../../lib/https'
import { useParams, useNavigate } from "react-router-dom";
import styled from 'styled-components';

const Table = styled.table`
  border-collapse: collapse;
  width: 100%;
  margin: 2rem;
`;

const Th = styled.th`
  background-color: #ddd;
  border: 1px solid #ddd;
  padding: 8px;
  text-align: left;
`;

const Td = styled.td`
  border: 1px solid #ddd;
  padding: 8px;
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
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(5);
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
          setShowDeleteUserForm={setShowDeleteUserForm}
          getUsers={getUsers}
        />
      )}
      <h1>User List</h1>
      <div>
        <FilterUsers handleSearch={handleSearch} />
        <Button onClick={() => setShowAddUserForm(true)}>Add User</Button>
        <ExportToExcel users={users} />
      </div>
      <Table>
        <thead>
          <tr>
            <Th>Name<Sort sortUsers={sortUsers} sortType={sortType} /></Th>
            <Th>Role</Th>
            <Th>Email</Th>
            <Th>Phone Number</Th>
            <Th>Address</Th>
            <Th>Actions</Th>
          </tr>
        </thead>
        <tbody>
          {sortedUsers.map(user => (
            <tr key={user.id}>
              <Td>{user.name}</Td>
              <Td>{user.role_name}</Td>
              <Td>{user.email}</Td>
              <Td>{user.phone_number}</Td>
              <Td>{user.address}</Td>
              <ActionsTd>
                <Button onClick={() => {
                  setCurrentUser(user)
                  setShowEditUserForm(true)
                }}>
                  <Icon><AiOutlineEdit /></Icon>
                </Button>
                <Button onClick={() => {
                  setCurrentUser(user)
                  setShowDeleteUserForm(true)
                }}>
                  <Icon><AiOutlineDelete /></Icon>
                </Button>
              </ActionsTd>
            </tr>
          ))}
        </tbody>
      </Table>
      <Pagination
        usersPerPage={usersPerPage}
        totalUsers={users.length}
        handlePagination={handlePagination}
        currentPage={currentPage}
      />
    </>
  );
}