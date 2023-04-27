import React, { useState } from 'react';

function ForgotPassword() {
  const [email, setEmail] = useState('');

  async function handleSubmit(event) {
    event.preventDefault();
    try {
      const response = await fetch('/api/forgot-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email })
      });
      const data = await response.json();
      // Show a message to the user indicating that an email has been sent
      alert(data.message);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <form className="center-form" onSubmit={handleSubmit}>
      <p>Enter your email address to reset your password:</p>
      <label>
        Email:
        <input type="email" value={email} onChange={e => setEmail(e.target.value)} required />
      </label>
      <button type="submit">Reset Password</button>
    </form>
  );
}

export default ForgotPassword;
