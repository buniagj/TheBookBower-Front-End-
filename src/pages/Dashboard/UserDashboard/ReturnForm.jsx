import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import styled from 'styled-components';

const ReturnContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  margin: -50px;
  background: linear-gradient(to bottom right, #654ea3, #eaafc8);
  backdrop-filter: blur(10px);
`;

const ReturnCard = styled.div`
  background: rgba(255, 255, 255, 0.2);
  border-radius: 20px;
  padding: 20px;
  width: 80%;
  max-width: 500px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.2);
  backdrop-filter: blur(10px);
  margin-bottom: 20px;
`;

const ReturnForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 10px;
  align-items: center;
`;

const ReturnInput = styled.input`
  padding: 10px;
  border: none;
  background: rgba(255, 255, 255, 0.5);
  border-radius: 10px;
  width: 100%;
  box-sizing: border-box;
  color: #fff;
`;

const ReturnButton = styled.button`
  background: #654ea3;
  border: none;
  padding: 10px 20px;
  border-radius: 10px;
  color: #fff;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: #7c3aed;
    color: #fff;
    text-decoration: none;
  }
`;

const ReturnModal = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 80%;
  width: 60%;
  margin: auto;
  background: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(10px);
  border-radius: 100px;
`;

const ReturnModalMessage = styled.div`
  color:#fff;
  font-size: 1rem;
  font-family: Source Code Pro;
  margin: 10px 20px;
  padding: 20px;
`;

const ReturnModalButton = styled.button`
  background: #654ea3;
  border: none;
  padding: 10px 20px;
  border-radius: 10px;
  color: #fff;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-top: -10px;

  &:hover {
    background: #7c3aed;
    color: #fff;
    text-decoration: none;
  }
`;

const Return = () => {
  const [name, setName] = useState('');
  const [book, setBook] = useState('');
  const [returned, setReturned] = useState(false);
  const [returnedBook, setReturnedBook] = useState(null);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleBookChange = (e) => {
    setBook(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('/api/return', {
        name,
        book,
      });
      setReturned(true);
      setReturnedBook(res.data.book);
      setShowSuccessMessage(true);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const handleReturnAnotherBook = () => {
    setName('');
    setBook('');
    setReturned(false);
    setShowSuccessMessage(false);
  };

  return (
    <ReturnContainer>
      {!returned ? (
        <ReturnCard>
          <h1>Return Book</h1>
          <ReturnForm onSubmit={handleSubmit}>
            <ReturnInput
              type="text"
              placeholder="Your Name"
              value={name}
              onChange={handleNameChange}
            />
            <ReturnInput
              type="text"
              placeholder="Book Name"
              value={book}
              onChange={handleBookChange}
            />
            <ReturnButton type="submit">Return</ReturnButton>
          </ReturnForm>
        </ReturnCard>
      ) : (
        <ReturnModal>
          {showSuccessMessage ? (
            <>
              <ReturnModalMessage>
                Dear Reader, <br /> You have returned <strong>{returnedBook}</strong> successfully! <br /> May the knowledge gained from it continue to enlighten your mind and enrich your soul.
              </ReturnModalMessage>
              <ReturnModalButton onClick={handleReturnAnotherBook}>
                Return Another Book
              </ReturnModalButton>
            </>
          ) : (
            <ReturnModalMessage>Returning...</ReturnModalMessage>
          )}
        </ReturnModal>
      )}
    </ReturnContainer>
  );
};

export default Return;