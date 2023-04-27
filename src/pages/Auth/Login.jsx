import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  async function handleSubmit(event) {
    event.preventDefault();
    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
      });
      const data = await response.json();
      // Assuming your Laravel API returns a token and role upon successful login
      localStorage.setItem('token', data.token); 
      localStorage.setItem('role', data.role); // Store the role in local storage
      localStorage.setItem('grade_level', data.grade_level); // Store the grade level in local storage
      localStorage.setItem('section', data.section); // Store the section in local storage
      
      // Redirect the user to the appropriate dashboard based on their role
      if (data.role === 'admin') {
        navigate('/admin');
      } else if (data.role === 'teacher') {
        navigate('/teacher');
      } else {
        navigate('/student');
      }
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <form className="center-form" onSubmit={handleSubmit}>
      <label>
        Email:
        <input type="email" value={email} onChange={e => setEmail(e.target.value)} required />
      </label>
      <label>
        Password:
        <input type="password" value={password} onChange={e => setPassword(e.target.value)} required />
      </label>
      <a href="./ForgotPassword">Forgot Password</a> {/* Added the "Forgot Password" link here */}
      <button type="submit">Login</button>
    </form>
  );
}

export default Login;
