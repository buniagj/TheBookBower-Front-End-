import React, { useState } from 'react';
import { updateUserProfile } from './UserService';
import './User.css';

function EditProfileForm({ user }) {
const [name, setName] = useState(user.name);
const [email, setEmail] = useState(user.email);
const [address, setAddress] = useState(user.address);
const [phoneNumber, setPhoneNumber] = useState(user.phone_number);
const [photo, setPhoto] = useState(user.photo);
const [isSubmitting, setIsSubmitting] = useState(false);

const handleFormSubmit = async (event) => {
event.preventDefault();
setIsSubmitting(true);
const updatedUser = { name, email, address, phone_number: phoneNumber, photo };
try {
const response = await updateUserProfile(user.id, updatedUser);
console.log(response);
alert('Profile updated successfully!');
} catch (error) {
console.error(error);
alert('Error updating profile. Please try again later.');
} finally {
setIsSubmitting(false);
}
};

const handleFileChange = (event) => {
const selectedFile = event.target.files[0];
const reader = new FileReader();
reader.onload = (event) => {
setPhoto(event.target.result);
};
reader.readAsDataURL(selectedFile);
};

const handlePromptBeforeSubmit = (event) => {
if (isSubmitting) {
event.preventDefault();
return;
}
const message = 'Are you sure you want to save these changes?';
if (window.confirm(message)) {
handleFormSubmit(event);
} else {
event.preventDefault();
}
};

return (
<form className="edit-profile-form" onSubmit={handlePromptBeforeSubmit}>
<h2>Edit Profile</h2>
<div className="form-group">
<label htmlFor="name" className="ant-modal-title"> Full  Name:</label>
<input
type="text"
id="name"
className="edit-input"
name="name"
value={name}
onChange={(event) => setName(event.target.value)}
/>
</div>
<div className="form-group">
<label htmlFor="phone_number" className="ant-modal-title">Phone Number:</label>
<input
type="tel"
id="phone_number"
className="edit-input"
name="phone_number"
value={phoneNumber}
onChange={(event) => setPhoneNumber(event.target.value)}
/>
</div>
<div className="form-group">
<label htmlFor="email" className="ant-modal-title">Email Address:</label>
<input
type="email"
id="email"
className="edit-input"
name="email"
value={email}
onChange={(event) => setEmail(event.target.value)}
/>
</div>
<div className="form-group">
<label htmlFor="address" className="ant-modal-title"> Complete Address:  </label>
<textarea
id="address"
className="edit-input"
name="address"
value={address}
onChange={(event) => setAddress(event.target.value)}
></textarea>
</div>
<div className="form-group">
<label htmlFor="photo" className="ant-modal-title">Photo:</label>
<input type="file" id="photo" name="photo" onChange={handleFileChange} />
{photo && <img src={photo} className="upload-photo" alt="user profile" />}
</div>
<div>
<button type="submit" className="btn btn-primary" disabled={isSubmitting}>
{isSubmitting ? 'Submitting...' : 'Save Changes'}
</button>
</div>
</form>
);
}

export default EditProfileForm;