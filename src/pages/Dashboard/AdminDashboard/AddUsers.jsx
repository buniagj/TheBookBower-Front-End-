import React, { useState } from 'react';
import axios from 'axios';
import Modal from 'react-modal';
import styled from 'styled-components';

Modal.setAppElement('#root');

const Button = styled.button`
  background-color: #0074d9;
  border: none;
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 0.25rem;
  cursor: pointer;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 1rem;
`;

const Label = styled.label`
  margin-bottom: 0.5rem;
  font-weight: bold;
`;

const Input = styled.input`
  padding: 0.5rem;
  border-radius: 0.25rem;
  border: 1px solid #ccc;
`;

export default function AddUserForm({ onAdd }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newUser = {
      name,
      email,
      password,
    };
    axios.post('localhost:8000/api/users', newUser)
      .then((response) => {
        onAdd(response.data);
        setName('');
        setEmail('');
        setPassword('');
        setModalIsOpen(false);
      })
      .catch((error) => {
        console.log(error);
        setError('An error occurred while saving the user. Please try again.');
      });
  };

  return (
    <div>
      
      <Modal isOpen={modalIsOpen} onRequestClose={() => setModalIsOpen(false)}>
        <h2>Add User</h2>
        <Form onSubmit={handleSubmit}>
          <FormGroup>
            <Label htmlFor="name">Name:</Label>
            <Input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} />
          </FormGroup>
          <FormGroup>
            <Label htmlFor="email">Email:</Label>
            <Input type="text" id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          </FormGroup>
          <FormGroup>
            <Label htmlFor="password">Password:</Label>
            <Input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          </FormGroup>
          <Button type="submit">Add</Button>
          <Button onClick={() => setModalIsOpen(false)}>Cancel</Button>
        </Form>
      </Modal>
    </div>
  );
}
