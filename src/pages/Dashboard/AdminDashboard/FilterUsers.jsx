import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form } from 'react-bootstrap';
import UserCard from './UserCard';
import axios from 'axios';
import styled from 'styled-components';

const CenteredForm = styled(Form)`
  display: flex;
  justify-content: center;
  width: 100%;
  margin: 20px auto;
  color: purple;
`;

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
    <Container>
      <Row>
        <Col>
           <CenteredForm>
            <Form.Group controlId="formSearchQuery">
              <Form.Control
                type="text"
                placeholder="Enter a name to search"
                value={searchQuery}
                onChange={handleSearchQueryChange}
              />
            </Form.Group>
          </CenteredForm>
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
