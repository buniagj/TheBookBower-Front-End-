import React, { useState } from 'react';

function Signup() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');

  async function handleSubmit(event) {
    event.preventDefault();
    try {
      const response = await fetch('/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, email, password, password_confirmation: passwordConfirmation })
      });
      const data = await response.json();
      // Assuming your Laravel API sends a verification email
      alert('A verification email has been sent to your email address. Please check your inbox and follow the instructions to complete the registration process.');
      window.location.replace('/login'); // Redirect the user to the login page after registration
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Name:
        <input type="text" value={name} onChange={e => setName(e.target.value)} required />
      </label>
      <label>
        Email:
        <input type="email" value={email} onChange={e => setEmail(e.target.value)} required />
      </label>
      <label>
        Password:
        <input type="password" value={password} onChange={e => setPassword(e.target.value)} required />
      </label>
      <label>
        Confirm Password:
        <input type="password" value={passwordConfirmation} onChange={e => setPasswordConfirmation(e.target.value)} required />
      </label>
      <button type="submit">Sign Up</button>
    </form>
  );
}

export default Signup;
