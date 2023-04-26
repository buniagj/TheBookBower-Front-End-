import React, { useState } from 'react';
import axios from 'axios';

export default function EditUserForm({ user, onEdit }) {
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [password, setPassword] = useState(user.password);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedUser = {
      ...user,
      name,
      email,
      password,
    };
    try {
      const response = await axios.put(`http://localhost:8000/api/users/${user.id}`, updatedUser);
      onEdit(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="name">Name:</label>
        <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} />
      </div>
      <div>
        <label htmlFor="email">Email:</label>
        <input type="text" id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
      </div>
      <div>
        <label htmlFor="password">Password:</label>
        <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      </div>
      <button type="submit">Save Changes</button>
    </form>
  );
}
