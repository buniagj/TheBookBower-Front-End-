import React, { useState, useEffect } from 'react';
import customCursorImg from '../assets/owl.png';
import './CustomCursor.css';

const CustomCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const setFromEvent = (e) => setPosition({ x: e.clientX, y: e.clientY });
    window.addEventListener('mousemove', setFromEvent);

    return () => window.removeEventListener('mousemove', setFromEvent);
  }, []);

  const handleClick = () => {
    console.log('Cursor clicked!');
  };

  return (
    <div
      className="cursor"
      style={{ left: `${position.x}px`, top: `${position.y}px` }}
      onClick={handleClick}
    >
      <img src={customCursorImg} alt="custom-cursor" />
    </div>
  );
};

export default CustomCursor;
