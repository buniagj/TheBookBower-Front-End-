import React, { useState } from 'react';

function Settings() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [photo, setPhoto] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // code to submit form data
  }

  const handlePhotoChange = (e) => {
    setPhoto(e.target.files[0]);
  }

  return (
    <div>
      <h1>Settings</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name:</label>
          <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} />
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div>
          <label htmlFor="photo">Profile Photo:</label>
          <input type="file" id="photo" accept="image/*" onChange={handlePhotoChange} />
        </div>
        <button type="submit">Save Changes</button>
      </form>
    </div>
  );
}

export default Settings;
