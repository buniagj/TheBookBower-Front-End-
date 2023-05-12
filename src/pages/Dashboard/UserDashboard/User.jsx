import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencilAlt } from '@fortawesome/free-solid-svg-icons';
import defaultPhoto from '../../../assets/DefaultProfilePhoto.png';
import '@fortawesome/fontawesome-free/css/all.css';
import EditProfileForm from './EditProfile';
import './User.css';
import { Modal } from 'antd';

function UserDashboard({ user }) {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const isStudent = user && user.role_name === 'student';
  const isTeacher = user && user.role_name === 'teacher';

  const handleEditProfile = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const closeIconStyle = {
    position: 'absolute',
    top: '10px',
    right: '10px',
    width: '40px',
    height: '40px',
    cursor: 'pointer'
  };

  return (
    <div className="dashboard-container">
      <h1>User Dashboard</h1>
      {user && (
        <div className="profile">
          <img
            src={user.photo || defaultPhoto}
            alt="Profile"
            className="profile-photo"
          />
          <div className="profile-details">
            <h2>{user.name}</h2>
            <p>{user.email}</p>
            <p>{user.address}</p>
            <p>{user.phone_number}</p>
            {isStudent && <p>{user.grade} - {user.section}</p>}
            {isTeacher && <p>Teacher</p>}
          </div>
          <button className="edit" onClick={handleEditProfile}>
            <FontAwesomeIcon icon={faPencilAlt} className="edit-button" />
          </button>
        </div>
      )}
      <div className="user-nav-links">
        <Link to="/booktable" className="user-nav-link">
          <img src={defaultPhoto} alt="MY TRANSACTIONS" />
          <span>MY TRANSACTIONS</span>
        </Link>
        <Link to="/borrowform" className="user-nav-link">
          <img src={defaultPhoto} alt="BORROW A BOOK" />
          <span>BORROW A BOOK</span>
        </Link>
        <Link to="/returnform" className="user-nav-link">
          <img src={defaultPhoto} alt="RETURN A BOOK" />
          <span>RETURN A BOOK</span>
        </Link>
      </div>
      <Modal
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={null}
        closable={false}
        width={500}
        bodyStyle={{ padding: '30px 50px' }}
      >
        <img
          src="/src/assets/icon-close.png"
          alt="Close"
          style={closeIconStyle}
          onClick={handleCancel}
        />
        <EditProfileForm user={user} />
      </Modal>
    </div>
  );
}

export default UserDashboard;
