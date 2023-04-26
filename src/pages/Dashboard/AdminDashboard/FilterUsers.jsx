import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form } from 'react-bootstrap';
import UserCard from './UserCard';
import axios from 'axios';

const FilterUsers = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    axios.get('/api/users')
      .then(response => {
        setUsers(response.data);
        setFilteredUsers(response.data);
      })
      .catch(error => console.log(error));
  }, []);

  const handleSearchQueryChange = (event) => {
    setSearchQuery(event.target.value);
    const filtered = users.filter(user =>
      user.name.toLowerCase().includes(event.target.value.toLowerCase())
    );
    setFilteredUsers(filtered);
  };

  return (
    <Container className="my-5">
      <Row>
        <Col lg={8}>
          <h2>Filter Users</h2>
          <Form>
            <Form.Group controlId="formSearchQuery">
              <Form.Label>Search Users</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter a name to search"
                value={searchQuery}
                onChange={handleSearchQueryChange}
              />
            </Form.Group>
          </Form>
          <Row>
            {filteredUsers.map(user => (
              <Col md={4} key={user.id}>
                <UserCard user={user} />
              </Col>
            ))}
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default FilterUsers;
