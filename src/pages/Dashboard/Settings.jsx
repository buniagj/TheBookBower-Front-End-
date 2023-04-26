import React, { useState } from 'react';

function Settings() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [photo, setPhoto] = useState(null);

  const handleSubmit = (e) => {
      e.preventDefault();

      // Create a new FormData object
      const formData = new FormData();

      // Add form data to the FormData object
      formData.append('name', name);
      formData.append('email', email);
      formData.append('photo', photo);

      // Send the form data to the server
      fetch('/api/settings', {
        method: 'POST',
        body: formData
      })
        .then(response => {
          if (response.ok) {
            console.log('Form data submitted successfully');
          } else {
            throw new Error('Form data submission failed');
          }
        })
        .catch(error => {
          console.error(error);
        });
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
          {photo ? (
            <img src={URL.createObjectURL(photo)} alt="Profile Photo" />
          ) : (
            <img src="https://icons8.com/icon/11730/name" alt="Default Profile Photo" />
          )}
          <input type="file" id="photo" accept="image/*" onChange={handlePhotoChange} />
        </div>
        <button type="submit">Save Changes</button>
      </form>
    </div>
  );
}

export default Settings;
