import React from 'react';

function StockAvailability(props) {
  const { availableStock } = props;

  return (
    <div>
      <p>Available Stock: {availableStock}</p>
    </div>
  );
}

export default StockAvailability;

