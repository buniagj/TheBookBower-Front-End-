import React, { useState, useEffect } from 'react';
import { Card, Button } from 'react-bootstrap';

const UserCard = ({ user }) => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    // Fetch user data from Laravel API using user ID
    fetch(`/api/users/${user.id}`)
      .then(response => response.json())
      .then(data => setUserData(data))
      .catch(error => console.error(error));
  }, [user.id]);

  if (!userData) {
    return <p>Loading user data...</p>;
  }

  return (
    <Card>
      <Card.Body>
        <Card.Title>{userData.name}</Card.Title>
        <Card.Text>
          {userData.email}<br />
          {userData.phone}<br />
          {userData.address}
        </Card.Text>
        <Button variant="primary">Edit</Button>
      </Card.Body>
    </Card>
  );
};

export default UserCard;
