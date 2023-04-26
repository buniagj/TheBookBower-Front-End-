import React from 'react';

function ExportExcelButton(props) {
  const handleClick = () => {
    props.onClick();
  };

  return (
    <button onClick={handleClick}>Export to Excel</button>
  );
}

export default ExportExcelButton;
