import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { AiOutlineEdit, AiOutlineDelete } from 'react-icons/ai';
import Pagination from './Pagination';
import EditUsers from './EditUsers';
import AddUsers from './AddUsers'
import { Row, Col } from 'react-bootstrap';
import DeleteUsers from './DeleteUsers';
import { sortByName, sortByLastName, sortByEmail } from "./Sort";
import ExportToExcel from './ExportToExcel';
import http from '../../../lib/https';
import { useParams, useNavigate } from "react-router-dom";
import styled from 'styled-components';
import Modal from 'react-modal';

Modal.setAppElement('#root');

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

const Input = styled.input`
  border: 2px solid #5f1d91;
  border-radius: 4px;
  padding: 8px;
  margin-left: 5rem;
  margin-bottom: 1rem;
  flex-grow: 1;
  width: 30%;
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
  float: right;
  margin-right: 5rem;
  cursor: pointer;
  text-decoration: none;
`;


const Icon = styled.span`
  display: inline-block;
  margin-right: 5px;
`;

export default function UserList() {
  const { id } = useParams();
  const [users, setUsers] = useState([]);
  const [sortType, setSortType] = useState('asc');
  const [sortDirection, setSortDirection] = useState("asc");
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(0);
  const [usersPerPage] = useState(10);
  const [editing, setEditing] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const [showAddUserForm, setShowAddUserForm] = useState(false);
  const [showEditUserForm, setShowEditUserForm] = useState(false);
  const [showDeleteUserForm, setShowDeleteUserForm] = useState(false);
  const [meta, setMeta] = useState({});
  const [modalIsOpen, setModalIsOpen] = useState(false);

  async function getUsers(page = 1) {
    const url = `/users?page=${page}`
    const res = await http.get(url, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`
      }
    })
    setUsers(res.data.data)
    setMeta(res.data.meta)
  }



 const sortUsers = (type) => {
    let sortedUsers = [...users];
    let direction = "asc";

    if (sortType === type && sortDirection === "asc") {
      direction = "desc";
    }

    switch (type) {
      case "name":
        sortedUsers.sort(sortByName);
        break;
      case "role":
        sortedUsers.sort(sortByRole);
        break;
      case "email":
        sortedUsers.sort(sortByEmail);
        break;
      case "phone_number":
        sortedUsers.sort(sortByPhoneNumber);
        break;
      case "address":
        sortedUsers.sort(sortByAddress);
        break;
      default:
        break;
    }

    if (direction === "desc") {
      sortedUsers.reverse();
    }

    setUsers(sortedUsers);
    setSortType(type);
    setSortDirection(direction);
  };

  const handleSearch = (event, page = 1) => {
    setSearchTerm(event.target.value);
    getUsers(event.target.value, page);
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
        <Modal isOpen={modalIsOpen} onRequestClose={() => setModalIsOpen(false)} setShowAddUserForm={setShowAddUserForm}>
          <AddUsers
          getUsers={getUsers}
        />
        </Modal>
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
          <Input
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
             <Th onClick={() => sortUsers("name")}>Name</Th>
            <Th onClick={() => sortUsers("role")}>Role</Th>
            <Th onClick={() => sortUsers("email")}>Email</Th>
            <Th onClick={() => sortUsers("phone_number")}>Phone Number</Th>
            <Th onClick={() => sortUsers("address")}>Address</Th>
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
     <Row>
          <Col>
            {meta.links && (
              <Pagination
                links={meta.links}
                active={meta.current_page}
                getUsers={getUsers}
              />
            )}
          </Col>
        </Row>
    </>
  );
}
