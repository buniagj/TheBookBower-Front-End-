import React from 'react';
import { useNavigate } from 'react-router-dom';

function HeroSection(props) {
  const navigate = useNavigate();

  const handleCtaClick = () => {
    navigate('/signup');
  };

  const handleNctaClick = () => {
    navigate('/about');
  };

  return (
    <div className="hero-section">
      <h1>Welcome to The Book Bower</h1>
      <p>Escape Reality, One Page at a Time</p>
      <button className="cta-btn" onClick={handleCtaClick}>Get Started</button>
      <button className="ncta-btn" onClick={handleNctaClick}>Learn More</button>
    </div>
  );
}

export default HeroSection;
