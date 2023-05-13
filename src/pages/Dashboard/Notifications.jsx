import React, { useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Dashboard.css';

function Notification(props) {
  const [showNotification, setShowNotification] = useState(false);

  if (!showNotification) {
    return (
      <div className="notification-card">
        <div className="notification empty">
          <p>You have 0 notifications</p>
        </div>
      </div>
    );
  }

  toast(props.message, { type: props.type, autoClose: 3000 });

  return (
    <div className="notification-card">
      <div className={`notification ${props.type}`}>
        <p>{props.message}</p>
        <button onClick={() => setShowNotification(false)}>X</button>
      </div>
    </div>
  );
}

export default Notification;
