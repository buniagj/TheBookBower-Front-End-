import React from 'react';
import XLSX from 'xlsx/dist/xlsx.full.min.js';

function ExportExcelButton(props) {
  const handleClick = () => {
    props.onClick();
  };

  return (
    <button onClick={handleClick}>Export to Excel</button>
  );
}

export default ExportExcelButton;
