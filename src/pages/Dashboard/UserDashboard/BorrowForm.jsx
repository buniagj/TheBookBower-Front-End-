import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import styled from 'styled-components';


const BorrowContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  margin: -50px;
  background: linear-gradient(to bottom right, #654ea3, #eaafc8);
  backdrop-filter: blur(10px);
`;

const BorrowCard = styled.div`
  background: rgba(255, 255, 255, 0.2);
  border-radius: 20px;
  padding: 20px;
  width: 80%;
  max-width: 500px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.2);
  backdrop-filter: blur(10px);
  margin-bottom: 20px;
`;

const BorrowForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 10px;
  align-items: center;
`;

const BorrowInput = styled.input`
  padding: 10px;
  border: none;
  background: rgba(255, 255, 255, 0.5);
  border-radius: 10px;
  width: 100%;
  box-sizing: border-box;
  color: #fff;
`;

const BorrowButton = styled.button`
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

const BorrowModal = styled.div`
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

const BorrowModalMessage = styled.div`
  color:#fff;
  font-size: 1rem;
  font-family: Source Code Pro;
  margin: 10px 20px;
  padding: 20px;
`;

const BorrowModalButton = styled.button`
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

const Borrow = () => {
  const [name, setName] = useState('');
  const [book, setBook] = useState('');
  const [borrowed, setBorrowed] = useState(false);
  const [borrowedBook, setBorrowedBook] = useState(null);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleBookChange = (e) => {
    setBook(e.target.value);
  };

  const handleBorrowBook = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/borrow', {
        name,
        book,
      });
      setBorrowedBook(response.data);
      setBorrowed(true);
      setShowSuccessMessage(true);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const handleReturnBook = async () => {
    try {
      await axios.put(`/api/borrow/${borrowedBook.id}`);
      setBorrowed(false);
      setBorrowedBook(null);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <BorrowContainer>
      {borrowed ? (
        <BorrowModal>
          <BorrowModalMessage>
            You have borrowed {borrowedBook.book} by {borrowedBook.name}.
          </BorrowModalMessage>
          <BorrowModalButton onClick={handleReturnBook}>
            Return Book
          </BorrowModalButton>
        </BorrowModal>
      ) : (
        <BorrowCard>
          <h2>Borrow a Book</h2>
          <BorrowForm onSubmit={handleBorrowBook}>
            <BorrowInput
              type="text"
              placeholder="Your Name"
              value={name}
              onChange={handleNameChange}
            />
            <BorrowInput
              type="text"
              placeholder="Book Title"
              value={book}
              onChange={handleBookChange}
            />
            <BorrowButton type="submit">Borrow</BorrowButton>
          </BorrowForm>
        </BorrowCard>
      )}
      {showSuccessMessage && (
        <BorrowModal>
      {!showSuccessMessage ? (
        <>
          <BorrowModalMessage>
            Dear Reader,
            <br /><br />
            You've just embarked on an exciting literary journey. We hope that this book will take you on a wild ride, teach you something new, or simply provide a much-needed escape from the hustle and bustle of daily life.
            <br />
            <br />
            But before you dive into the pages, we have a few requests:
            <br />
            <br />
            Please treat our book with kindness and care, as it's been loved by many before you. Avoid any spills, tears, or dog-eared pages. We want it to be in pristine condition for the next reader.
            <br />
            <br />
            Don't forget to return the book by the due date, so that others can enjoy it too.
            <br />
            <br />
            And lastly, but most importantly, we hope that you'll love the book as much as we do. We believe that a great book has the power to change lives, broaden horizons, and bring people together. So go ahead, get lost in the pages, and let the adventure begin!
            
          </BorrowModalMessage>
          <BorrowModalButton onClick={handleBorrow}>Proceed</BorrowModalButton>
        </>
      ) : (
        <BorrowSuccessMessage>
          You have successfully borrowed the book. Happy Reading!
        </BorrowSuccessMessage>
      )}
      </BorrowModal>
      )}
    </BorrowContainer>
  );
};


export default Borrow;