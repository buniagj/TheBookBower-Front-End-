import React, { useState } from 'react';
import axios from 'axios';

function ContactForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [submissionStatus, setSubmissionStatus] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      await axios.post('/api/contact', {
        name: name,
        email: email,
        message: message,
      });

      setSubmissionStatus('success');
    } catch (error) {
      setSubmissionStatus('error');
    }
  };

  return (
    <div>
      <h1>Contact Us</h1>
      {submissionStatus === 'success' && (
        <p>Thank you for your message! We will get back to you shortly.</p>
      )}
      {submissionStatus === 'error' && (
        <p>There was an error submitting your message. Please try again later.</p>
      )}
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input
            type="text"
            value={name}
            onChange={(event) => setName(event.target.value)}
          />
        </label>
        <br />
        <label>
          Email:
          <input
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
        </label>
        <br />
        <label>
          Message:
          <textarea
            value={message}
            onChange={(event) => setMessage(event.target.value)}
          />
        </label>
        <br />
        <button type="submit">Send</button>
      </form>
    </div>
  );
}

export default ContactForm;
