import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Button, Dropdown, DropdownButton } from 'react-bootstrap';
import ExportToExcel from './AdminDashboard/ExportToExcel';

function ActionButtons({ borrowedBooks, handleRefresh }) {
  const [showExportDropdown, setShowExportDropdown] = useState(false);

  const handleExportExcel = () => {
    setShowExportDropdown(false);
    <ExportToExcel data={borrowedBooks} />;
  };

  return (
    <div className="d-flex mb-3">
      <Button variant="primary" className="mr-2" onClick={handleRefresh}>
        Refresh
      </Button>
      <DropdownButton
        title="Export"
        show={showExportDropdown}
        onToggle={(isOpen) => setShowExportDropdown(isOpen)}
      >
        <Dropdown.Item onClick={handleExportExcel}>Excel</Dropdown.Item>
      </DropdownButton>
    </div>
  );
}

ActionButtons.propTypes = {
  borrowedBooks: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      book: PropTypes.shape({
        id: PropTypes.number.isRequired,
        title: PropTypes.string.isRequired,
        author: PropTypes.string.isRequired,
        isbn: PropTypes.string.isRequired,
      }).isRequired,
      borrower: PropTypes.shape({
        id: PropTypes.number.isRequired,
        firstName: PropTypes.string.isRequired,
        lastName: PropTypes.string.isRequired,
        email: PropTypes.string.isRequired,
      }).isRequired,
      dueDate: PropTypes.string.isRequired,
      returnedDate: PropTypes.string,
    })
  ).isRequired,
  handleRefresh: PropTypes.func.isRequired,
};

export default ActionButtons;
