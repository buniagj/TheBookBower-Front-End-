import React, { useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Notification(props) {
  const [showNotification, setShowNotification] = useState(true);

  if (showNotification) {
    // show toast notification
    toast(props.message, { type: props.type, autoClose: 3000 });
    
    return (
      <div className={`notification ${props.type}`}>
        <p>{props.message}</p>
        <button onClick={() => setShowNotification(false)}>X</button>
      </div>
    );
  } else {
    return null;
  }
}

export default Notification;
