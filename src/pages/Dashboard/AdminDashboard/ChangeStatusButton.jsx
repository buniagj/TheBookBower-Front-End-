import React from "react";
import { Button } from "react-bootstrap";

const ChangeStatusButton = ({ id, status, onStatusChange }) => {
  const handleStatusChange = () => {
    const newStatus = status === "returned" ? "borrowed" : "returned";
    onStatusChange(id, newStatus);
  };

  return (
    <Button variant={status === "returned" ? "success" : "warning"} onClick={handleStatusChange}>
      {status === "returned" ? "Returned" : "Borrowed"}
    </Button>
  );
};

export default ChangeStatusButton;
