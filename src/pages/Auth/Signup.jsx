import React, { useState } from 'react';

function Signup() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [role, setRole] = useState('student'); // Default role is "student"
  const [gradeLevel, setGradeLevel] = useState('');
  const [section, setSection] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [address, setAddress] = useState('');

  async function handleSubmit(event) {
    event.preventDefault();
    try {
      const response = await fetch('/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ 
          name, 
          email, 
          password, 
          password_confirmation: passwordConfirmation,
          role,
          grade_level: gradeLevel,
          section,
          phone_number: phoneNumber,
          address,
        })
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
      <label>
        Role:
        <select value={role} onChange={e => setRole(e.target.value)}>
          <option value="student">Student</option>
          <option value="teacher">Teacher</option>
          <option value="admin">Admin</option>
        </select>
      </label>
      {role === 'student' && (
        <>
          <label>
            Grade Level:
            <input type="text" value={gradeLevel} onChange={e => setGradeLevel(e.target.value)} required />
          </label>
          <label>
            Section:
            <input type="text" value={section} onChange={e => setSection(e.target.value)} required />
          </label>
        </>
      )}
      <label>
        Phone Number:
        <input type="text" value={phoneNumber} onChange={e => setPhoneNumber(e.target.value)} required />
      </label>
      <label>
        Address:
        <input type="text" value={address} onChange={e => setAddress(e.target.value)} required />
      </label>
      <button type="submit">Sign Up</button>
    </form>
  );
}

export default Signup;
